import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { register } from "../services/authService";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // Giống đăng nhập, thêm luật: nhập lại mật khẩu phải khớp
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;

    setLoading(true);
    setSubmitError(null);
    try {
      // Đăng ký xong tự đăng nhập luôn
      const { user, token } = await register(name, email, password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.popTo("Tabs", { screen: "Home" }); // đóng các màn giữa (Đăng nhập, Chi tiết…) để Back không quay lại
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err)); // vd "Email này đã được đăng ký"
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Tạo tài khoản mới</Text>

      <FormField label="Họ tên" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
      />
      <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry />
      <FormField
        label="Nhập lại mật khẩu"
        value={confirm}
        onChangeText={setConfirm}
        error={errors.confirm}
        secureTextEntry
      />

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />

      <Pressable onPress={() => navigation.replace("Login", route.params)}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12 },
  title: { fontSize: 18, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 8 },
  submitError: { color: colors.danger, fontSize: 12, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", fontSize: 13, textAlign: "center", marginTop: 4 },
});
