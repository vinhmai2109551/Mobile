import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export type SortOrder = "asc" | "desc" | null; // null = giữ thứ tự gốc

interface Props { value: SortOrder; onChange: (value: SortOrder) => void; }

const OPTIONS: { key: Exclude<SortOrder, null>; label: string }[] = [
  { key: "asc", label: "Giá tăng dần ↑" },
  { key: "desc", label: "Giá giảm dần ↓" },
];

// Chọn kiểu sắp xếp theo giá; bấm lại nút đang chọn để bỏ sắp xếp
export function SortBar({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((o) => {
        const active = value === o.key;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(active ? null : o.key)}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, paddingHorizontal: 16 },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.navy,
    backgroundColor: colors.card,
  },
  btnActive: { backgroundColor: colors.navy },
  text: { fontSize: 12, fontWeight: "600", color: colors.navy },
  textActive: { color: "#fff" },
});
