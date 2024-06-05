import { ComponentProps } from 'react';

import { OpaqueColorValue, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const HeaderLeftWithIcon = ({
  color,
  iconName,
}: {
  color?: string | OpaqueColorValue;
  iconName?: IoniconsName;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={router.back}>
      <Ionicons
        name={iconName || 'arrow-back'}
        size={34}
        color={color || Colors.dark}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftWithIcon;
