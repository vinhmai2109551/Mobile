import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { login } from "../services/authService";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { validateEmail, validatePassword } from "../utils/validators";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // bấm 👁 để hiện/ẩn mật khẩu
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null); // lỗi chung từ server
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // 1) kiểm tra dữ liệu trước, còn lỗi thì dừng, chưa gọi API
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (e.email || e.password) return;

    // 2) gọi API; loading chặn bấm hai lần
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);
      // 3) đi từ giỏ hàng sang thì quay lại Thanh toán, còn lại về Home
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.popTo("Tabs", { screen: "Home" }); // đóng các màn giữa (Đăng nhập, Chi tiết…) để Back không quay lại
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>📚</Text>
      <Text style={styles.title}>Đăng nhập BookStore</Text>

      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        placeholder="demo@bookstore.vn"
      />
      <FormField
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry={!showPassword}
        placeholder="Tối thiểu 6 ký tự"
        right={
          <Pressable
            onPress={() => setShowPassword((v) => !v)}
            hitSlop={8}
            accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            <Text style={styles.eye}>{showPassword ? "🙈" : "👁"}</Text>
          </Pressable>
        }
      />

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} />

      {/* replace để bấm ← không phải quay qua lại giữa Đăng nhập và Đăng ký */}
      <Pressable onPress={() => navigation.replace("Register", route.params)}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
      </Pressable>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12 },
  logo: { fontSize: 52, textAlign: "center", marginTop: 8 },
  title: { fontSize: 18, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 8 },
  eye: { fontSize: 18 },
  submitError: { color: colors.danger, fontSize: 12, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", fontSize: 13, textAlign: "center", marginTop: 4 },
  hint: { backgroundColor: "#E0F2FE", borderRadius: 8, padding: 10, marginTop: 4 },
  hintText: { fontSize: 11, color: colors.navy, textAlign: "center" },
});
