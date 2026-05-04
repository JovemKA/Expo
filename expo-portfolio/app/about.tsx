import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, VStack } from '@gluestack-ui/themed';

import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { useThemeMode } from '@/hooks/useThemeMode';
import { appTechnologies, extraFeatures } from '@/services/data';
import { Theme } from '@/theme';

export default function AboutScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScreenLayout>
      <SectionHeader title="About" subtitle="A snapshot of my approach" />
      <VStack style={styles.bodyStack}>
        <Text style={styles.body}>
          I design and build mobile apps that feel intentional, fast, and human. My focus is on
          modular architectures, design systems, and production-readiness, so teams can ship with
          confidence.
        </Text>
        <Text style={styles.body}>
          This portfolio app is structured around reusable UI primitives, typed data, and a theme
          system that keeps the visuals consistent across every screen.
        </Text>
      </VStack>

      <SectionHeader title="Technology Stack" subtitle="Built with tools I trust" />
      <VStack style={styles.list}>
        {appTechnologies.map((tech) => (
          <Text key={tech} style={styles.listItem}>
            - {tech}
          </Text>
        ))}
      </VStack>

      <SectionHeader
        title="Extra Features Implemented"
        subtitle="Beyond the core requirements"
      />
      <VStack style={styles.list}>
        {extraFeatures.map((feature) => (
          <Text key={feature} style={styles.listItem}>
            - {feature}
          </Text>
        ))}
      </VStack>
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bodyStack: {
      gap: theme.spacing.md,
    },
    body: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.lg,
      color: theme.colors.text,
    },
    list: {
      gap: theme.spacing.xs,
    },
    listItem: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text,
    },
  });
