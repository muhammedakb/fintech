import Dropdown from '@/components/Dropdown';
import RoundButton from '@/components/RoundButton';
import Colors from '@/constants/Colors';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const Home = () => {
  const balance = 1420;
  const currency = '₺';

  const onAddMoney = () => {
    // pass
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>{currency}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={'add'} onPress={() => {}} text='Add money' />
        <RoundButton icon={'refresh'} text='Exchange' />
        <RoundButton icon={'list'} text='Details' />
        <Dropdown />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
export default Home;
