import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import type { TabScreenProps } from "../navigation/types";
import { useAuth, useWishlist } from "../store/hooks";
import { colors } from "../theme";

export function AccountScreen({ navigation }: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signOut } = useAuth();
  const { ids } = useWishlist();

  // Hàng "Danh sách yêu thích" có ở cả hai trạng thái
  const wishlistRow = (
    <Pressable style={styles.row} onPress={() => navigation.navigate("Wishlist")}>
      <Text style={styles.rowIcon}>❤️</Text>
      <Text style={styles.rowTitle}>Danh sách yêu thích</Text>
      <Text style={styles.rowCount}>{ids.length} sách</Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <AppHeader title="👤 Tài khoản" />

      {/* hai nhánh giao diện theo trạng thái đăng nhập lấy từ Redux */}
      {isLoggedIn && user ? (
        <View style={styles.body}>
          <Text style={styles.emoji}>🙂</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.actions}>
            {wishlistRow}
            {/* đăng xuất: user/token về null, usePersistence tự xoá phiên đã lưu */}
            <PrimaryButton title="Đăng xuất" variant="outline" onPress={signOut} />
          </View>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.emoji}>🔒</Text>
          <Text style={styles.name}>Bạn chưa đăng nhập</Text>
          <View style={styles.actions}>
            <PrimaryButton title="Đăng nhập" onPress={() => navigation.navigate("Login")} />
            <PrimaryButton title="Đăng ký" variant="outline" onPress={() => navigation.navigate("Register")} />
            {wishlistRow}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { alignItems: "center", paddingTop: 28, paddingHorizontal: 16, gap: 6 },
  emoji: { fontSize: 56 },
  name: { fontSize: 16, fontWeight: "800", color: colors.text },
  email: { fontSize: 12, color: colors.muted },
  actions: { alignSelf: "stretch", gap: 10, marginTop: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowIcon: { fontSize: 16 },
  rowTitle: { flex: 1, fontSize: 13, fontWeight: "700", color: colors.text },
  rowCount: { fontSize: 12, color: colors.muted },
  arrow: { fontSize: 20, color: colors.muted },
});
