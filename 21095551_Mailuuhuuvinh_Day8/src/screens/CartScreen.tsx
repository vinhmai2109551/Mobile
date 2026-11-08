import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { CartItemRow } from "../components/CartItemRow";
import { EmptyState } from "../components/EmptyState";
import { PrimaryButton } from "../components/PrimaryButton";
import type { TabScreenProps } from "../navigation/types";
import { useAuth, useCart } from "../store/hooks";
import { colors } from "../theme";
import { discountOf, findCoupon } from "../utils/coupons";
import { confirmDialog } from "../utils/dialog";
import { formatPrice } from "../utils/format";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();

  // Mã giảm giá: coupon là mã đang áp dụng, couponMsg là dòng báo kết quả
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const discount = discountOf(coupon, totalPrice);
  const finalTotal = totalPrice - discount; // đây mới là số tiền truyền sang Checkout

  const applyCoupon = () => {
    const found = findCoupon(couponInput);
    if (found) {
      setCoupon(found.code);
      setCouponMsg({ text: `Đã áp dụng ${found.code}: ${found.label}`, ok: true });
    } else {
      setCoupon(null);
      setCouponMsg({ text: "Mã giảm giá không hợp lệ", ok: false });
    }
  };

  // Hỏi lại trước khi xóa
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId));
  };

  // Chưa đăng nhập thì sang Đăng nhập, kèm "đích đến" để đăng nhập xong quay lại Thanh toán
  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  return (
    <View style={styles.root}>
      <AppHeader title="🛒 Giỏ hàng" />

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={couponInput}
              onChangeText={setCouponInput}
              placeholder="Mã giảm giá (SALE10)"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <Pressable style={styles.couponBtn} onPress={applyCoupon}>
              <Text style={styles.couponBtnText}>Áp dụng</Text>
            </Pressable>
          </View>
          {couponMsg ? (
            <Text style={[styles.couponMsg, { color: couponMsg.ok ? colors.success : colors.danger }]}>
              {couponMsg.text}
            </Text>
          ) : null}

          <View style={styles.line}>
            <Text style={styles.lineLabel}>Tạm tính</Text>
            <Text style={styles.lineValue}>{formatPrice(totalPrice)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.line}>
              <Text style={styles.lineLabel}>Giảm giá</Text>
              <Text style={[styles.lineValue, { color: colors.success }]}>-{formatPrice(discount)}</Text>
            </View>
          )}
          <View style={styles.line}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatPrice(finalTotal)}</Text>
          </View>

          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 10, flexGrow: 1 },
  footer: {
    backgroundColor: colors.card,
    padding: 14,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.bg,
    outlineWidth: 0,
  },
  couponBtn: {
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  couponBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  couponMsg: { fontSize: 11 },
  line: { flexDirection: "row", justifyContent: "space-between" },
  lineLabel: { fontSize: 12, color: colors.muted },
  lineValue: { fontSize: 12, fontWeight: "700", color: colors.text },
  totalLabel: { fontSize: 14, fontWeight: "800", color: colors.text },
  totalValue: { fontSize: 14, fontWeight: "800", color: colors.text },
});
