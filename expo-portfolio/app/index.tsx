import React, { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';

import { ProjectCard } from '@/components/ProjectCard';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { useThemeMode } from '@/hooks/useThemeMode';
import { profile, projects } from '@/services/data';
import { Theme } from '@/theme';
import { openExternalLink } from '@/utils/linking';

export default function HomeScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <ScreenLayout>
      <VStack style={styles.profileCard}>
        <HStack style={styles.profileHeader}>
          <Image source={profile.avatar} style={styles.avatar} />
          <VStack style={styles.profileText}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
          </VStack>
        </HStack>
        <Text style={styles.bio}>{profile.bio}</Text>
        <HStack style={styles.linkRow}>
          <Button
            style={styles.primaryButton}
            onPress={() => {
              void openExternalLink(profile.links.github);
            }}>
            <ButtonText style={styles.primaryButtonText}>GitHub</ButtonText>
          </Button>
          <Button
            style={styles.secondaryButton}
            onPress={() => {
              void openExternalLink(profile.links.linkedin);
            }}>
            <ButtonText style={styles.secondaryButtonText}>LinkedIn</ButtonText>
          </Button>
        </HStack>
        <ThemeToggle compact />
      </VStack>

      <SectionHeader title="Featured Projects" subtitle="A quick snapshot of recent work" />
      <VStack style={styles.cardStack}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </VStack>
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    profileCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    profileHeader: {
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    profileText: {
      flex: 1,
      gap: 4,
    },
    avatar: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: theme.colors.chip,
    },
    name: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
    },
    title: {
      fontFamily: theme.typography.fontFamily.subtitle,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.mutedText,
    },
    bio: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
      color: theme.colors.text,
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
    cardStack: {
      gap: theme.spacing.lg,
    },
  });
