import React, { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';

import { ProjectCard } from '@/components/ProjectCard';
import { ScreenLayout } from '@/components/ScreenLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { useThemeMode } from '@/hooks/useThemeMode';
import { profile, projects } from '@/services/data';
import { Theme } from '@/theme';
import { openExternalLink } from '@/utils/linking';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const { theme } = useThemeMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const githubLink = profile.links.github;
  const linkedinLink = profile.links.linkedin;

  return (
    <ScreenLayout>
      <VStack style={styles.heroSection}>
        <Image source={profile.avatar} style={styles.avatar} />
        <VStack style={styles.heroCopy}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <HStack style={{ gap: 4, alignItems: 'center' }}>
            <IconSymbol name="location.fill" color={theme.colors.mutedText} size={20} />
            <Text style={styles.location}>Recife, PE</Text>
          </HStack>
        </VStack>
        <HStack style={styles.linkRow}>
          {githubLink ? (
            <Button
              style={styles.primaryButton}
              onPress={() => {
                void openExternalLink(githubLink);
              }}>
              <HStack style={{ gap: 8, alignItems: 'center' }}>
                <IconSymbol name="github.fill" color={theme.colors.background} size={20} />
                <ButtonText style={styles.primaryButtonText}>GitHub</ButtonText>
              </HStack>
            </Button>
          ) : null}
          {linkedinLink ? (
            <Button
              style={styles.secondaryButton}
              onPress={() => {
                void openExternalLink(linkedinLink);
              }}>
              <HStack style={{ gap: 8, alignItems: 'center' }}>
                <IconSymbol name="linkedin.fill" color={theme.colors.text} size={20} />
                <ButtonText style={styles.secondaryButtonText}>LinkedIn</ButtonText>
              </HStack>
            </Button>
          ) : null}
        </HStack>
        <HStack style={styles.statsRow}>
          <VStack style={styles.statItem}>
            <IconSymbol name="certificate.fill" color={theme.colors.primary} size={26} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Certificados</Text>
          </VStack>
          <VStack style={styles.statItem}>
            <IconSymbol name="work.fill" color={theme.colors.primary} size={26} />
            <Text style={styles.statValue}>1 ano</Text>
            <Text style={styles.statLabel}>Experiência</Text>
          </VStack>
          <VStack style={styles.statItem}>
            <IconSymbol name="folder.fill" color={theme.colors.primary} size={26} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Projetos</Text>
          </VStack>
        </HStack>
      </VStack>

      <VStack style={styles.cardGroup}>
        <VStack style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Resumo Profissional</Text>
          <Text style={styles.aboutText}>{profile.bio}</Text>
        </VStack>

        <SectionHeader title="Stack Principal" subtitle="Habilidades Técnicas" />
        {featuredProjects.length > 0 ? (
          <VStack style={styles.cardStack}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </VStack>
        ) : (
          <VStack style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Ainda não há projetos cadastrados nesta versão do portfólio.
            </Text>
          </VStack>
        )}
      </VStack>
    </ScreenLayout>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    heroSection: {
      gap: theme.spacing.md,
      alignItems: 'center',
      paddingBottom: theme.spacing.sm,
    },
    cardGroup: {
      gap: theme.spacing.lg,
      width: '100%',
      paddingTop: theme.spacing.sm,
    },
    heroCopy: {
      alignItems: 'center',
      gap: 4,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.chip,
      borderWidth: 4,
      borderColor: theme.colors.background,
    },
    name: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
      textAlign: 'center',
    },
    title: {
      fontFamily: theme.typography.fontFamily.subtitle,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.mutedText,
      textAlign: 'center',
    },
    location: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.mutedText,
      textAlign: 'center',
    },
    linkRow: {
      gap: theme.spacing.sm,
      width: '75%',
      paddingHorizontal: theme.spacing.md,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      flex: 1,
    },
    primaryButtonText: {
      color: theme.colors.background,
      fontFamily: theme.typography.fontFamily.subtitle,
    },
    secondaryButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flex: 1,
    },
    secondaryButtonText: {
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily.subtitle,
    },
    statsRow: {
      width: '100%',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xs,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 2,
    },
    statValue: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
    },
    statLabel: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.mutedText,
      textAlign: 'center',
    },
    aboutCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: 28,
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
    },
    aboutTitle: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.background,
      paddingBottom: theme.spacing.xs,
    },
    aboutText: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.lg,
      color: theme.colors.background,
    },
    cardStack: {
      gap: theme.spacing.lg,
      marginHorizontal: theme.spacing.lg,
    },
    emptyState: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
      marginHorizontal: theme.spacing.xs,
    },
    emptyText: {
      fontFamily: theme.typography.fontFamily.body,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.mutedText,
    },
  });
