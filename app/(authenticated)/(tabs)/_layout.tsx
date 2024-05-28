import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='registered' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='invest'
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='line-chart' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='transfers'
        options={{
          title: 'Transfers',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='exchange' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='crypto'
        options={{
          title: 'Crypto',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='bitcoin' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='lifestyle'
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='th' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
