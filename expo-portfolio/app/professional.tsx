import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { VStack } from '@gluestack-ui/themed';

import { ListItem } from '@/components/ListItem';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { useThemeMode } from '@/hooks/useThemeMode';
import { professional } from '@/services/data';
import { Theme } from '@/theme';

export default function ProfessionalScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScreenLayout>
      <SectionHeader title="Professional Experience" subtitle="Roles and impact" />
      {professional.length > 0 ? (
        <VStack style={styles.stack}>
          {professional.map((item) => (
            <ListItem
              key={`${item.company}-${item.role}`}
              title={item.role}
              subtitle={item.company}
              period={item.period}
              description={item.description}
              tags={item.technologies}
            />
          ))}
        </VStack>
      ) : (
        <VStack style={styles.emptyState}>
          <SectionHeader title="Nenhum registro profissional disponível" subtitle="" />
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
