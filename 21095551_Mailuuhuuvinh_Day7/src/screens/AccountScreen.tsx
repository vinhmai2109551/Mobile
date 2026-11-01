import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";

export function AccountScreen() {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  return (
    <View style={styles.root}>
      <AppHeader title="👤 Tài khoản" />

      {/* hai nhánh giao diện theo trạng thái đăng nhập lấy từ Redux */}
      {isLoggedIn && user ? (
        <View style={styles.body}>
          <Text style={styles.emoji}>🙂</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Pressable style={styles.outlineBtn} onPress={signOut}>
            <Text style={styles.outlineText}>Đăng xuất</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.emoji}>🔒</Text>
          <Text style={styles.name}>Bạn chưa đăng nhập</Text>
          <Pressable
            style={styles.button}
            // đăng nhập giả lập: không gọi API, chỉ lưu user + token giả vào store
            onPress={() => signIn({ id: 1, name: "Học viên Demo", email: "demo@bookstore.vn" }, "fake-token")}
          >
            <Text style={styles.buttonText}>Đăng nhập thử (dữ liệu giả)</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  emoji: { fontSize: 56 },
  name: { fontSize: 16, fontWeight: "800", color: colors.text },
  email: { fontSize: 12, color: colors.muted },
  button: {
    marginTop: 10,
    backgroundColor: colors.indigo,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  outlineBtn: {
    marginTop: 10,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.indigo,
  },
  outlineText: { color: colors.indigo, fontWeight: "700", fontSize: 13 },
});
