import {
  View,
  useWindowDimensions,
  StyleSheet,
  ColorValue,
} from 'react-native';
import { Loader, SkeletonLoader } from './SkeletonLoader';

type CryptoListLoaderProps = {
  backgroundColor?: ColorValue;
  highlightColor?: ColorValue;
};

export const CryptoListLoader = ({
  backgroundColor,
  highlightColor,
}: CryptoListLoaderProps) => {
  return (
    <SkeletonLoader
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
    >
      <View style={styles.container}>
        <Item />
      </View>
    </SkeletonLoader>
  );
};

const Item = () => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <View>
        <Loader style={[styles.line, { width: width * 0.5 }]} />
        <Loader style={[styles.item, { width: width * 0.9 }]} />
        <Loader style={[styles.item, { width: width * 0.9 }]} />
        <Loader style={[styles.item, { width: width * 0.9 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  line: { height: 20, marginBottom: 10 },
  item: { height: 60, marginVertical: 3, borderRadius: 5 },
});
