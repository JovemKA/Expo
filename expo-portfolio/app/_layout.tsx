import 'react-native-reanimated';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { ThemeProvider } from '@/features/theme/ThemeProvider';
import { useThemeMode } from '@/hooks/useThemeMode';

void SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { colorMode } = useThemeMode();

  return (
    <>
      {/*
        Stack is the best UX for this resume app because each section reads like a
        focused narrative page, and the stack gives smooth transitions without UI clutter.
      */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider>
        <RootLayoutInner />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
