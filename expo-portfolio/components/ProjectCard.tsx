import React, { useMemo } from 'react';
import { Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

import { useThemeMode } from '@/hooks/useThemeMode';
import { Project } from '@/services/data';
import { Theme } from '@/theme';
import { openExternalLink } from '@/utils/linking';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Box style={styles.card}>
      <VStack style={styles.stack}>
        <VStack style={styles.titleBlock}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.description}>{project.description}</Text>
        </VStack>
        <HStack style={styles.techStack}>
          {project.technologies.map((tech) => (
            <Box key={tech} style={styles.techChip}>
              <Text style={styles.techText}>{tech}</Text>
            </Box>
          ))}
        </HStack>
        <HStack style={styles.linkRow}>
          {project.links.github ? (
            <Button
              style={styles.primaryButton}
              onPress={() => {
                void openExternalLink(project.links.github);
              }}>
              <ButtonText style={styles.primaryButtonText}>GitHub</ButtonText>
            </Button>
          ) : null}
          {project.links.demo ? (
            <Button
              style={styles.secondaryButton}
              onPress={() => {
                void openExternalLink(project.links.demo);
              }}>
              <ButtonText style={styles.secondaryButtonText}>Live Demo</ButtonText>
            </Button>
          ) : null}
        </HStack>
      </VStack>
    </Box>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    stack: {
      gap: theme.spacing.md,
    },
    titleBlock: {
      gap: theme.spacing.xs,
    },
    title: {
      fontFamily: theme.typography.fontFamily.subtitle,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
    },
    description: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.md,
      color: theme.colors.mutedText,
    },
    techStack: {
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
    },
    techChip: {
      backgroundColor: theme.colors.chip,
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
    },
    techText: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.mutedText,
    },
    linkRow: {
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
    },
    primaryButtonText: {
      color: theme.colors.background,
      fontFamily: theme.typography.fontFamily.subtitle,
    },
    secondaryButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    secondaryButtonText: {
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily.subtitle,
    },
  });
