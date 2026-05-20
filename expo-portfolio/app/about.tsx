import { Text, VStack } from '@gluestack-ui/themed';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { usePortfolioContent } from '@/hooks/usePortfolioContent';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

export default function AboutScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { content } = usePortfolioContent();

  return (
    <ScreenLayout>
      <SectionHeader title="Sobre" subtitle="Uma visão rápida sobre minha abordagem" />
      <VStack style={styles.bodyStack}>
        {(content.aboutParagraphs || []).map((p, idx) => (
          <Text key={`about-${idx}`} style={styles.body}>
            {p}
          </Text>
        ))}
      </VStack>

      <SectionHeader title="Stack de Tecnologias" subtitle="Construído com ferramentas que confio" />
      <VStack style={styles.list}>
        {content.appTechnologies.map((tech) => (
          <Text key={tech} style={styles.listItem}>
            - {tech}
          </Text>
        ))}
      </VStack>

      <SectionHeader title="Recursos Extras" subtitle="Além dos requisitos principais" />
      <VStack style={styles.list}>
        {content.extraFeatures.map((feature) => (
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
