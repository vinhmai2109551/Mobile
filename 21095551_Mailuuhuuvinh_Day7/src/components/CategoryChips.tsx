import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme";
import type { Category } from "../types";

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

// Hàng chip danh mục cuộn ngang; bấm lại chip đang chọn để bỏ chọn
export function CategoryChips({ categories, selectedId, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {categories.map((c) => {
        const active = c.id === selectedId;
        return (
          <Pressable
            key={c.id}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(active ? null : c.id)}
          >
            <Text style={[styles.text, active && styles.textActive]}>{c.emoji} {c.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  text: { fontSize: 12, fontWeight: "600", color: colors.text },
  textActive: { color: "#fff" },
});
