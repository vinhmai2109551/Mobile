import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props { value: number; size?: number; onChange?: (v: number) => void; }

// Một component, hai việc: chỉ hiển thị sao (value) hoặc cho bấm chọn (khi có onChange)
export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value); // 4.5 -> tô 5 sao, 4.4 -> tô 4 sao
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>★</Text>
        );
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            {star}
          </Pressable>
        ) : (
          <View key={n}>{star}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2, alignItems: "center" },
});
