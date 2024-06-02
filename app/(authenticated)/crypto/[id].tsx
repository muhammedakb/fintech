import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { ICryptoDetail } from '@/interfaces/crypto-detail';
import { Tickers } from '@/interfaces/tickers';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Circle, useFont } from '@shopify/react-native-skia';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const CryptoDetail = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: {
      price: 0,
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery<ICryptoDetail>({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await (await fetch(`/api/info?ids=${id}`)).json();
      const result = info[id as string];
      return result;
    },
  });

  const { data: tickers } = useQuery<Tickers>({
    queryKey: ['tickers'],
    queryFn: async () => await (await fetch(`/api/tickers`)).json(),
  });

  useEffect(() => {
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const animatedText = useAnimatedProps(() => ({
    text: `${state.y.price.value.value.toFixed(2)} €`,
    defaultValue: '',
  }));

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: '',
    };
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior='automatic'
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Text style={styles.subtitle}>{data?.symbol}</Text>
              <Image
                source={{ uri: data?.logo }}
                style={{ width: 60, height: 60 }}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name='add' size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name='arrow-back' size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {tickers && (
                <>
                  {isActive ? (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                        animatedProps={animatedText}
                      />
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          fontSize: 18,
                          color: Colors.gray,
                        }}
                        animatedProps={animatedDateText}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                      >
                        {tickers[tickers.length - 1].price.toFixed(2)}€
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.gray,
                        }}
                      >
                        Today
                      </Text>
                    </View>
                  )}
                  <CartesianChart
                    //@ts-ignore
                    chartPressState={state}
                    //@ts-ignore
                    data={tickers}
                    //@ts-ignore
                    xKey={'timestamp'}
                    //@ts-ignore
                    yKeys={['price']}
                    axisOptions={{
                      font,
                      tickCount: 4,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} €`,
                      formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
                    }}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          //@ts-ignore
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, animi? Quasi neque pariatur, consequatur molestias cum
                placeat numquam quam asperiores, dolorem est a dignissimos in
                quibusdam distinctio expedita perspiciatis corrupti? Tempore,
                aliquid quia, doloremque sed vel alias rem porro ex tempora
                perspiciatis commodi. Quod, explicabo aliquam recusandae est,
                adipisci quisquam sint, nobis quidem doloribus animi beatae
                dignissimos sunt impedit a?
              </Text>
            </View>
          </>
        )}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={`${index}-${item}`}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
                onPress={() => setActiveIndex(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        sections={[{ data: [{ title: 'Chart' }] }]}
        style={{ marginTop: headerHeight }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default CryptoDetail;
