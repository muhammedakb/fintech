import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { ICryptoDetail } from '@/interfaces/crypto-detail';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const CryptoDetail = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();

  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery<ICryptoDetail>({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await (await fetch(`/api/info?ids=${id}`)).json();
      const result = info[id as string];
      return result;
    },
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
          <View style={{ height: 500, backgroundColor: 'green' }}></View>
          //   <View style={[defaultStyles.block, { marginTop: 20 }]}>
          //     <Text style={styles.subtitle}>Overview</Text>
          //     <Text style={{ color: Colors.gray }}>
          //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
          //       animi? Quasi neque pariatur, consequatur molestias cum placeat
          //       numquam quam asperiores, dolorem est a dignissimos in quibusdam
          //       distinctio expedita perspiciatis corrupti? Tempore, aliquid quia,
          //       doloremque sed vel alias rem porro ex tempora perspiciatis
          //       commodi. Quod, explicabo aliquam recusandae est, adipisci quisquam
          //       sint, nobis quidem doloribus animi beatae dignissimos sunt impedit
          //       a?
          //     </Text>
          //   </View>
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
