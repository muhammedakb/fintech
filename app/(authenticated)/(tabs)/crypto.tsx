import { ICurrency } from '@/interfaces/crypto';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';

import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { CryptoListLoader } from '@/components/CryptoListLoader';
import { Loader, SkeletonLoader } from '@/components/SkeletonLoader';

const Crypto = () => {
  const headerHeight = useHeaderHeight();

  const { data, isLoading } = useQuery<ICurrency[]>({
    queryKey: ['currencies'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = data?.map((currency) => currency.id).join(',');

  const { data: infoData, isLoading: isImgLoading } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      {isLoading ? (
        <CryptoListLoader />
      ) : (
        <>
          <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
          <View style={defaultStyles.block}>
            {data?.map((currency) => (
              <Link key={currency.id} asChild href={`/crypto/${currency.id}`}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 14,
                    alignItems: 'center',
                  }}
                >
                  {isImgLoading ? (
                    <SkeletonLoader>
                      <Loader
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                    </SkeletonLoader>
                  ) : (
                    <Image
                      source={{ uri: infoData?.[currency.id].logo }}
                      style={{ width: 40, height: 40 }}
                    />
                  )}
                  <View style={{ flex: 1, gap: 6 }}>
                    <Text style={{ fontWeight: '600', color: Colors.dark }}>
                      {currency.name}
                    </Text>
                    <Text style={{ color: Colors.gray }}>
                      {currency.symbol}
                    </Text>
                  </View>
                  <View style={{ gap: 6, alignItems: 'flex-end' }}>
                    <Text>{currency.quote.EUR.price.toFixed(2)} €</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                      <Ionicons
                        name={
                          currency.quote.EUR.percent_change_1h > 0
                            ? 'caret-up'
                            : 'caret-down'
                        }
                        size={16}
                        color={
                          currency.quote.EUR.percent_change_1h > 0
                            ? 'green'
                            : 'red'
                        }
                      />
                      <Text
                        style={{
                          color:
                            currency.quote.EUR.percent_change_1h > 0
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {currency.quote.EUR.percent_change_1h.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Crypto;
