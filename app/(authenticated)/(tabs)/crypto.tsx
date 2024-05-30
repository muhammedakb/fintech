import { Currency } from '@/interfaces/crypto';
import { useQuery } from '@tanstack/react-query';

import { View, Text, Image } from 'react-native';

const Crypto = () => {
  const { data, isLoading } = useQuery<Currency[]>({
    queryKey: ['currencies'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = data?.map((currency) => currency.id).join(',');

  const { data: infoData } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <View>
      {data?.map((currency) => (
        <View key={currency.id} style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: infoData?.[currency.id].logo }}
            style={{ width: 32, height: 32 }}
          />
          <Text>{currency.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Crypto;
