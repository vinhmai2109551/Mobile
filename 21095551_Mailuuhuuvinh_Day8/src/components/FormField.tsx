import type { ReactNode } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../theme";

interface Props extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string | null;
  right?: ReactNode; // nút nhỏ nằm cuối ô nhập (vd 👁 hiện mật khẩu)
}

// Nhãn + ô nhập + dòng lỗi ngay dưới ô; có lỗi thì viền đỏ
export function FormField({ label, error, right, ...inputProps }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, !!error && styles.boxError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        {right}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4 },
  label: { fontSize: 12, fontWeight: "700", color: colors.text },
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  boxError: { borderColor: colors.danger },
  input: { flex: 1, height: 42, fontSize: 14, color: colors.text, outlineWidth: 0 },
  error: { fontSize: 11, color: colors.danger },
});
