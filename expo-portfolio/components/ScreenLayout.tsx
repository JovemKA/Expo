import React, { useMemo } from 'react';
import { Box, HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { SectionNav } from '@/components/SectionNav';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

type ScreenLayoutProps = {
  children: React.ReactNode;
};

export function ScreenLayout({ children }: ScreenLayoutProps) {
  const { theme } = useThemeMode();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const footerHeight = 88 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box style={styles.screen}>
        <Box style={styles.orbPrimary} pointerEvents="none" />
        <Box style={styles.orbAccent} pointerEvents="none" />
        <HStack style={styles.header}>
          <VStack>
            <Text style={styles.title}>Portfolio</Text>
          </VStack>
          <ThemeToggle />
        </HStack>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: footerHeight + theme.spacing.lg }]}
          showsVerticalScrollIndicator={false}>
          <VStack style={styles.stack}>{children}</VStack>
        </ScrollView>
        <Box style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.md }]}>
          <SectionNav />
        </Box>
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
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    title: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.mutedText,
    },
    content: {
      padding: theme.spacing.lg,
      flexGrow: 1,
    },
    stack: {
      gap: theme.spacing.lg,
      marginHorizontal: theme.spacing.lg,
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderTopWidth: 1,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: -2 },
      elevation: 6,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xs,
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
