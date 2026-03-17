import { Image, StyleSheet } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ProfileCardProps {
  name: string;
  bio: string;
  imagePath?: any;
  fallbackUrl?: string;
}

export function ProfileCard({ name, bio, imagePath, fallbackUrl }: ProfileCardProps) {
  const borderColor = useThemeColor({}, 'tint');

  const getImageSource = () => {
    if (imagePath) {
      try {
        return imagePath;
      } catch (error) {
        if (fallbackUrl) {
          return { uri: fallbackUrl };
        }
      }
    }
    return fallbackUrl ? { uri: fallbackUrl } : require('@/assets/images/react-logo.png');
  };

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={getImageSource()}
        style={[styles.profileImage, { borderColor }]}
      />
      <ThemedText type="title" style={styles.name}>
        {name}
      </ThemedText>
      <ThemedText type="default" style={styles.bio}>
        {bio}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    marginBottom: 16,
  },
  name: {
    marginBottom: 8,
    textAlign: 'center',
  },
  bio: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
