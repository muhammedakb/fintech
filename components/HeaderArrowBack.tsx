import { TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HeaderArrowBack = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={router.back}>
      <Ionicons name='arrow-back' size={34} color={Colors.dark} />
    </TouchableOpacity>
  );
};

export default HeaderArrowBack;
