import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props { message: string; onRetry: () => void; }

// Báo lỗi bằng tiếng Việt + nút Thử lại gọi onRetry
export function ErrorView({ message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Thử lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 10 },
  emoji: { fontSize: 44 },
  message: { fontSize: 13, color: colors.text, textAlign: "center" },
  button: {
    marginTop: 6,
    backgroundColor: colors.indigo,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
