import { Box, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import React, { useEffect, useMemo, useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native';

import { ProjectCard } from '@/components/ProjectCard';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { usePortfolioContent } from '@/hooks/usePortfolioContent';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Theme } from '@/theme';

export default function ProjectsScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { content } = usePortfolioContent();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) {
      return content.projects;
    }

    return content.projects.filter((project) => {
      const haystack = [
        project.title,
        project.description,
        project.technologies.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [content.projects, normalizedQuery]);

  const handleQueryChange = (text: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setQuery(text);
  };

  return (
    <ScreenLayout>
      <SectionHeader title="Projetos" subtitle="Explore o portfólio completo" />
      <Input style={styles.search}>
        <InputField
          value={query}
          onChangeText={handleQueryChange}
          placeholder="Título, tecnologia ou palavra-chave"
          placeholderTextColor={theme.colors.mutedText}
          style={styles.searchText}
        />
      </Input>

      <VStack style={styles.stack}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
        {filteredProjects.length === 0 ? (
          <Box style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum projeto corresponde a essa pesquisa.</Text>
          </Box>
        ) : null}
      </VStack>
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    search: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    searchText: {
      fontFamily: theme.typography.fontFamily.body,
      color: theme.colors.text,
    },
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
    emptyText: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.mutedText,
    },
  });
