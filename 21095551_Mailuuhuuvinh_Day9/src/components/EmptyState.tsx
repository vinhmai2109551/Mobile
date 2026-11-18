import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  emoji: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Màn "trống": emoji + tiêu đề + gợi ý, có thể kèm một nút hành động
export function EmptyState({ emoji, title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 48, paddingHorizontal: 24, gap: 6 },
  emoji: { fontSize: 48 },
  title: { fontSize: 15, fontWeight: "700", color: colors.text, textAlign: "center" },
  message: { fontSize: 12, color: colors.muted, textAlign: "center" },
  button: {
    marginTop: 12,
    backgroundColor: colors.indigo,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
