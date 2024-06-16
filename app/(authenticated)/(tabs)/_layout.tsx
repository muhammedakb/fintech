import CustomHeader from '@/components/CustomHeader';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint='extraLight'
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)' }}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='registered' size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name='invest'
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='line-chart' size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name='transfers'
        options={{
          title: 'Transfers',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='exchange' size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name='crypto'
        options={{
          title: 'Crypto',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='bitcoin' size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name='lifestyle'
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name='th' size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
};

export default Layout;
