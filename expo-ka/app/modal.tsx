import { useRouter } from 'expo-router';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { profileData } from '@/constants/profile-data';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tintColor = useThemeColor({}, 'tint');
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.mainTitle}>
              Stack Técnica
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Tecnologias e ferramentas que utilizo
            </ThemedText>
          </View>

          <View style={styles.categoriesContainer}>
            {profileData.stack.map((stackItem, index) => (
              <View 
                key={index} 
                style={[
                  styles.categoryContainer,
                  {
                    backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                  }
                ]}
              >
                <View style={styles.categoryHeader}>
                  <View 
                    style={[
                      styles.iconContainer,
                      { backgroundColor: isDark ? '#374151' : '#dbeafe' }
                    ]}
                  >
                    <IconSymbol 
                      name={stackItem.icon as any}
                      size={20}
                      color={tintColor}
                    />
                  </View>
                  <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
                    {stackItem.category}
                  </ThemedText>
                </View>

                <View style={styles.technologiesList}>
                  {stackItem.technologies.map((tech, techIndex) => (
                    <View key={techIndex} style={styles.technologyItem}>
                      <View style={[styles.dot, { backgroundColor: tintColor }]} />
                      <ThemedText type="default" style={styles.technologyText}>
                        {tech}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: tintColor }]}
          >
            <ThemedText style={styles.buttonText}>
              ← Voltar para o perfil
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  mainTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 28,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoryContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
  },
  technologiesList: {
    paddingLeft: 4,
  },
  technologyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  technologyText: {
    fontSize: 15,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
