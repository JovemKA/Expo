import React, { useMemo } from 'react';
import { Button, ButtonText, HStack } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';

import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academic', href: '/academic' },
  { label: 'Professional', href: '/professional' },
  { label: 'Projects', href: '/projects' },
];

export function SectionNav() {
  const pathname = usePathname();
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <HStack style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} asChild>
            <Button style={[styles.button, isActive ? styles.buttonActive : styles.buttonInactive]}>
              <ButtonText
                style={[
                  styles.buttonText,
                  isActive ? styles.buttonTextActive : styles.buttonTextInactive,
                ]}>
                {item.label}
              </ButtonText>
            </Button>
          </Link>
        );
      })}
    </HStack>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    button: {
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
    },
    buttonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    buttonInactive: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    buttonText: {
      fontFamily: theme.typography.fontFamily.subtitle,
    },
    buttonTextActive: {
      color: theme.colors.background,
    },
    buttonTextInactive: {
      color: theme.colors.text,
    },
  });
