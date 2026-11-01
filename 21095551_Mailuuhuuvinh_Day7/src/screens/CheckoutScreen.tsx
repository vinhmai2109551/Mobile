import { StyleSheet, Text, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";
import { formatPrice } from "../utils/format";

export function CheckoutScreen({ route }: RootScreenProps<"Checkout">) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total)}</Text> {/* nhận total từ màn Giỏ */}
      <Text style={styles.note}>(Form địa chỉ & thanh toán sẽ làm ở buổi sau)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", gap: 6, padding: 24 },
  label: { fontSize: 12, color: colors.muted },
  total: { fontSize: 28, fontWeight: "800", color: colors.indigo },
  note: { fontSize: 11, color: colors.muted, marginTop: 4 },
});
