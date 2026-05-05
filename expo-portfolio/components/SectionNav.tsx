import React, { useMemo } from 'react';
import { HStack } from '@gluestack-ui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { Link, usePathname } from 'expo-router';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

type NavItem = {
  label: string;
  href: string;
  icon: IconSymbolName;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: 'house.fill' },
  { label: 'Professional', href: '/professional', icon: 'briefcase.fill' },
  { label: 'Academic', href: '/academic', icon: 'graduationcap.fill' },
  { label: 'Projects', href: '/projects', icon: 'folder.fill' },
  { label: 'About', href: '/about', icon: 'person.crop.circle.fill' },
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
            <Pressable accessibilityLabel={item.label} style={styles.pressable}>
              {({ pressed }) => (
                <View style={[styles.button, pressed ? styles.buttonPressed : null]}>
                  <IconSymbol
                    name={item.icon}
                    color={isActive ? theme.colors.primary : theme.colors.mutedText}
                    size={26}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        );
      })}
    </HStack>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
    },
    pressable: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      minHeight: 46,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    buttonPressed: {
      opacity: 0.72,
    },
  });
