import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

// Vòng quay + dòng chữ khi đang tải dữ liệu
export function LoadingView({ label = "Đang tải…" }: { label?: string }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={colors.indigo} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  label: { fontSize: 12, color: colors.muted },
});
