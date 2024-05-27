import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  if (!loaded) {
    return null;
  }

  console.log(CLERK_PUBLISHABLE_KEY);

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='signup'
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={34} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={34} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
          headerRight: () => (
            <Link asChild href={'/help'}>
              <TouchableOpacity>
                <Ionicons
                  name='help-circle-outline'
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='help'
        options={{ title: 'Help', presentation: 'modal' }}
      />
      <Stack.Screen
        name='verify/[phone]'
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={34} color={Colors.dark} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => (
  <ClerkProvider
    publishableKey={CLERK_PUBLISHABLE_KEY!}
    tokenCache={tokenCache}
  >
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='light' />
      <InitialLayout />
    </GestureHandlerRootView>
  </ClerkProvider>
);

export default RootLayoutNav;
