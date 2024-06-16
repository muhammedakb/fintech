import { defaultStyles } from '@/constants/Styles';
import { View, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const Invest = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[defaultStyles.container, { paddingTop: headerHeight }]}>
      <Text>Invest</Text>
    </View>
  );
};

export default Invest;
