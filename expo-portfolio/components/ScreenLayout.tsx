import React, { useMemo } from 'react';
import { Box, ScrollView, VStack } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionNav } from '@/components/SectionNav';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

type ScreenLayoutProps = {
  children: React.ReactNode;
};

export function ScreenLayout({ children }: ScreenLayoutProps) {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box style={styles.screen}>
        <Box style={styles.orbPrimary} pointerEvents="none" />
        <Box style={styles.orbAccent} pointerEvents="none" />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <VStack style={styles.stack}>
            <SectionNav />
            {children}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    stack: {
      gap: theme.spacing.lg,
    },
    orbPrimary: {
      position: 'absolute',
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: theme.colors.primary,
      opacity: 0.08,
      top: -60,
      right: -70,
    },
    orbAccent: {
      position: 'absolute',
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: theme.colors.accent,
      opacity: 0.08,
      bottom: 40,
      left: -40,
    },
  });
