import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import type { TabScreenProps } from "../navigation/types";
import { useAuth, useWishlist } from "../store/hooks";
import { colors } from "../theme";

export function AccountScreen({ navigation }: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signOut } = useAuth();
  const { ids } = useWishlist();
  const row = (emoji: string, label: string, onPress: () => void, suffix?: string) => (
    <Pressable style={styles.row} onPress={onPress}>
      <Text>{emoji}</Text><Text style={styles.rowTitle}>{label}</Text>{suffix ? <Text style={styles.rowCount}>{suffix}</Text> : null}<Text style={styles.arrow}>›</Text>
    </Pressable>
  );
  return <View style={styles.root}><AppHeader title="👤 Tài khoản" />
    {isLoggedIn && user ? <View style={styles.body}>
      <Text style={styles.emoji}>🙂</Text><Text style={styles.name}>{user.name}</Text><Text style={styles.email}>{user.email}</Text>
      {user.phone ? <Text style={styles.email}>📞 {user.phone}</Text> : null}
      <PrimaryButton title="✎ Chỉnh sửa" variant="outline" onPress={() => navigation.navigate("EditProfile")} />
      {row("🧾", "Đơn hàng của tôi", () => navigation.navigate("Orders"))}
      {row("🔔", "Thông báo", () => navigation.navigate("Notifications"))}
      {row("❤️", "Danh sách yêu thích", () => navigation.navigate("Wishlist"), `${ids.length} sách`)}
      <PrimaryButton title="Đăng xuất" variant="outline" onPress={signOut} />
    </View> : <View style={styles.body}><Text style={styles.emoji}>🔒</Text><Text style={styles.name}>Bạn chưa đăng nhập</Text><PrimaryButton title="Đăng nhập" onPress={() => navigation.navigate("Login")} /><PrimaryButton title="Đăng ký" variant="outline" onPress={() => navigation.navigate("Register")} />{row("❤️", "Danh sách yêu thích", () => navigation.navigate("Wishlist"), `${ids.length} sách`)}</View>}
  </View>;
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg }, body: { padding: 20, gap: 10, alignItems: "stretch" },
  emoji: { fontSize: 56, textAlign: "center" }, name: { fontSize: 16, fontWeight: "800", color: colors.text, textAlign: "center" },
  email: { fontSize: 12, color: colors.muted, textAlign: "center" }, row: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.card, borderRadius: 12, padding: 14 },
  rowTitle: { flex: 1, fontSize: 13, fontWeight: "700", color: colors.text }, rowCount: { fontSize: 12, color: colors.muted }, arrow: { fontSize: 20, color: colors.muted },
});
