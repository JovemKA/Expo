import { Link } from 'expo-router';
import { StyleSheet, ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { profileData } from '@/constants/profile-data';

export default function ModalScreen() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.mainTitle}>
          Stack Técnica
        </ThemedText>

        {profileData.stack.map((stackItem, index) => (
          <View key={index} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <IconSymbol 
                name={stackItem.icon as any}
                size={24}
                color={tintColor}
              />
              <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
                {stackItem.category}
              </ThemedText>
            </View>

            <View style={styles.technologiesList}>
              {stackItem.technologies.map((tech, techIndex) => (
                <View key={techIndex} style={styles.technologyItem}>
                  <ThemedText type="default" style={styles.technologyText}>
                    • {tech}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Link href="/" dismissTo style={styles.link}>
          <ThemedText type="link" style={styles.linkText}>
            ← Voltar para o perfil
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  categoryTitle: {
    fontSize: 16,
  },
  technologiesList: {
    paddingLeft: 36,
    gap: 8,
  },
  technologyItem: {
    marginVertical: 4,
  },
  technologyText: {
    fontSize: 14,
  },
  link: {
    marginTop: 32,
    marginBottom: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
});
