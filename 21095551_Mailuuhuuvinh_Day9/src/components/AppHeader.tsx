import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

// children = phần bên phải (nút 🔍...) hoặc ô tìm kiếm khi không truyền title
interface Props { title?: string; children?: ReactNode; }

// Header navy cho các màn nằm trong Tab (màn trong Stack đã có header riêng)
export function AppHeader({ title, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingBottom: 12,
    minHeight: 64,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
