import React, { useMemo } from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { colorMode, toggleColorMode, theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Button onPress={toggleColorMode} style={[styles.button, compact ? styles.compact : null]}>
      <ButtonText style={styles.text}>
        {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </ButtonText>
    </Button>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    compact: {
      paddingHorizontal: theme.spacing.sm,
    },
    text: {
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily.subtitle,
    },
  });
