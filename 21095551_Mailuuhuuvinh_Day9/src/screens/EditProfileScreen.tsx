import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { updateProfile } from "../services/userService";
import { useAuth } from "../store/hooks";
import { colors } from "../theme";
import { showMessage } from "../utils/dialog";
import { validatePhone, validateRequired } from "../utils/validators";

export function EditProfileScreen({ navigation }: RootScreenProps<"EditProfile">) {
  const { user, patchUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  if (!user) return null;
  const errors = { name: validateRequired("họ tên")(name), phone: validatePhone(phone) };
  const save = async () => {
    setTouched(true);
    if (errors.name || errors.phone) return;
    setLoading(true); setSubmitError(null);
    try {
      const updated = await updateProfile(user.id, { name: name.trim(), phone: phone.trim() });
      patchUser(updated);
      showMessage("Đã lưu", "Thông tin hồ sơ đã được cập nhật.", () => navigation.goBack());
    } catch (e) { setSubmitError(getErrorMessage(e)); } finally { setLoading(false); }
  };
  return <ScrollView contentContainerStyle={styles.content}>
    <FormField label="Email" value={user.email} editable={false} style={styles.disabled} />
    <FormField label="Họ tên" value={name} onChangeText={setName} error={touched ? errors.name : null} autoCapitalize="words" />
    <FormField label="Số điện thoại" value={phone} onChangeText={setPhone} error={touched ? errors.phone : null} keyboardType="phone-pad" />
    {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
    <PrimaryButton title="Lưu thay đổi" onPress={save} loading={loading} />
  </ScrollView>;
}
const styles = StyleSheet.create({ content: { padding: 16, gap: 12, backgroundColor: colors.bg, flexGrow: 1 }, disabled: { opacity: 0.6 }, error: { color: colors.danger, textAlign: "center", fontSize: 12 } });
