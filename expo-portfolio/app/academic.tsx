import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { VStack } from '@gluestack-ui/themed';

import { ListItem } from '@/components/ListItem';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { useThemeMode } from '@/hooks/useThemeMode';
import { academic } from '@/services/data';
import { Theme } from '@/theme';

export default function AcademicScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScreenLayout>
      <SectionHeader title="Academic Experience" subtitle="Education and research" />
      <VStack style={styles.stack}>
        {academic.map((item) => (
          <ListItem
            key={`${item.institution}-${item.course}`}
            title={item.institution}
            subtitle={item.course}
            period={item.period}
            description={item.description}
          />
        ))}
      </VStack>
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    stack: {
      gap: theme.spacing.lg,
    },
  });
