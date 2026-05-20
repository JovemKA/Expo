import { VStack } from '@gluestack-ui/themed';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ListItem } from '@/components/ListItem';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { usePortfolioContent } from '@/hooks/usePortfolioContent';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

export default function AcademicScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { content } = usePortfolioContent();

  return (
    <ScreenLayout>
      <SectionHeader title="Experiência Acadêmica" subtitle="Educação e pesquisa" />
      {content.academic.length > 0 ? (
        <VStack style={styles.stack}>
          {content.academic.map((item) => (
            <ListItem
              key={`${item.institution}-${item.course}`}
              title={item.institution}
              subtitle={item.course}
              period={item.period}
              description={item.description}
            />
          ))}
        </VStack>
      ) : (
        <VStack style={styles.emptyState}>
          <SectionHeader title="Nenhum registro acadêmico disponível" subtitle="" />
        </VStack>
      )}
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    stack: {
      gap: theme.spacing.lg,
    },
    emptyState: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
    },
  });
