import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PaymentOption } from "../components/PaymentOption";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { createOrder } from "../services/orderService";
import { useAuth, useCart } from "../store/hooks";
import { colors } from "../theme";
import type { PaymentMethod } from "../types";
import { showMessage } from "../utils/dialog";
import { formatPrice } from "../utils/format";
import { validatePhone, validateRequired } from "../utils/validators";

export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { user, isLoggedIn } = useAuth();
  const { items, totalPrice, clear } = useCart();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
  }, [isLoggedIn, navigation, route.params.total]);
  useEffect(() => { if (user) { setName(user.name); setPhone(user.phone ?? ""); } }, [user]);

  if (!isLoggedIn || !user) return null;
  const errors = {
    name: validateRequired("họ tên người nhận")(name),
    phone: validatePhone(phone),
    address: validateRequired("địa chỉ giao hàng")(address),
  };
  const valid = !errors.name && !errors.phone && !errors.address && items.length > 0;
  const submit = async () => {
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await createOrder({
        userId: user.id,
        items: items.map(({ bookId, title, price, quantity }) => ({ bookId, title, price, quantity })),
        total: route.params.total || totalPrice,
        address: { name: name.trim(), phone: phone.trim(), address: address.trim() },
        paymentMethod: payment,
      });
      clear();
      showMessage("Đặt hàng thành công 🎉", "Cảm ơn bạn đã mua sắm tại BookStore!", () => navigation.navigate("Tabs", { screen: "Home" }));
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total || totalPrice)}</Text>
      <Text style={styles.heading}>Địa chỉ giao hàng</Text>
      <FormField label="Họ tên người nhận" value={name} onChangeText={setName} error={touched ? errors.name : null} autoCapitalize="words" />
      <FormField label="Số điện thoại" value={phone} onChangeText={setPhone} error={touched ? errors.phone : null} keyboardType="phone-pad" />
      <FormField label="Địa chỉ" value={address} onChangeText={setAddress} error={touched ? errors.address : null} autoCapitalize="sentences" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
      <Text style={styles.heading}>Phương thức thanh toán</Text>
      <PaymentOption label="Thanh toán khi nhận hàng (COD)" selected={payment === "cod"} onPress={() => setPayment("cod")} />
      <PaymentOption label="Chuyển khoản ngân hàng" hint="Chỉ minh hoạ giao diện" selected={payment === "bank"} onPress={() => setPayment("bank")} />
      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <PrimaryButton title="Xác nhận đặt hàng" onPress={submit} loading={loading} disabled={!valid} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12, backgroundColor: colors.bg },
  label: { fontSize: 12, color: colors.muted, textAlign: "center" },
  total: { fontSize: 28, fontWeight: "800", color: colors.indigo, textAlign: "center", marginBottom: 8 },
  heading: { fontSize: 15, fontWeight: "800", color: colors.navy, marginTop: 6 },
  submitError: { color: colors.danger, fontSize: 12, textAlign: "center" },
});
