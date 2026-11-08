import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "solid" | "outline";
}

// Nút chính; loading thì hiện vòng quay và không bấm được (tránh bấm hai lần)
export function PrimaryButton({ title, onPress, loading = false, disabled = false, variant = "solid" }: Props) {
  const outline = variant === "outline";
  const blocked = loading || disabled;
  return (
    <Pressable
      onPress={onPress}
      disabled={blocked}
      style={[styles.button, outline && styles.outline, blocked && styles.blocked]}
    >
      {loading ? (
        <ActivityIndicator color={outline ? colors.indigo : "#fff"} />
      ) : (
        <Text style={[styles.text, outline && styles.textOutline]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.indigo,
  },
  outline: { backgroundColor: "transparent" },
  blocked: { opacity: 0.55 },
  text: { color: "#fff", fontWeight: "700", fontSize: 14 },
  textOutline: { color: colors.indigo },
});
