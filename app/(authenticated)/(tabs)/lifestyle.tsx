import { defaultStyles } from '@/constants/Styles';
import { View, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const LifeStyle = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[defaultStyles.container, { paddingTop: headerHeight }]}>
      <Text>LifeStyle</Text>
    </View>
  );
};

export default LifeStyle;
