import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { formatPrice } from "../utils/format";

export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { isLoggedIn } = useAuth();

  // Lớp chặn thứ hai: vào Checkout bằng đường khác mà chưa đăng nhập vẫn bị đẩy sang Đăng nhập
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
    }
  }, [isLoggedIn, navigation, route.params.total]);

  if (!isLoggedIn) return null; // chưa đăng nhập thì không vẽ gì

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total)}</Text>
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
