import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { ProfileCard } from './profile-card';
import { StackButton } from './stack-button';
import { profileData } from '@/constants/profile-data';

export function Profile() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.disciplineTitle}>
            {profileData.disciplineTitle}
          </ThemedText>
        </ThemedView>

        <ProfileCard 
          name={profileData.name}
          bio={profileData.bio}
          imagePath={profileData.profileImage}
          fallbackUrl={profileData.fallbackImageUrl}
        />

        <StackButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  disciplineTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
});
