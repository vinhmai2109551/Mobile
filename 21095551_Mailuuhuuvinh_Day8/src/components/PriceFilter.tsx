import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { PRICE_RANGES, type PriceRange } from "../utils/filters";

interface Props { value: PriceRange; onChange: (value: PriceRange) => void; }

// 3 nút lọc giá; bấm lại nút đang chọn để bỏ chọn (về null)
export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable
            key={r.key}
            onPress={() => onChange(active ? null : r.key)}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{r.label}</Text>
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
    borderColor: colors.cyan,
    backgroundColor: colors.card,
  },
  btnActive: { backgroundColor: colors.cyan },
  text: { fontSize: 12, fontWeight: "600", color: colors.cyan },
  textActive: { color: "#fff" },
});
