import { Link } from 'expo-router';
import { StyleSheet, Pressable, Platform } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { IconSymbol } from './ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export function StackButton() {
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <Link href="/modal" asChild>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: tintColor,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <IconSymbol 
          name="info.circle.fill" 
          size={20} 
          color={tintColor}
          style={styles.icon}
        />
        <ThemedText type="defaultSemiBold" style={[styles.text, { color: tintColor, backgroundColor }]}>
          Ver Stack
        </ThemedText>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
    minHeight: 48,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 16,
  },
});
