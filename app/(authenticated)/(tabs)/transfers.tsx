import { View, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { defaultStyles } from '@/constants/Styles';

const Transfers = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[defaultStyles.container, { paddingTop: headerHeight }]}>
      <Text>Transfers</Text>
    </View>
  );
};

export default Transfers;
