// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng (Cart Screen)
// 3 vùng tách biệt, không chồng lấp: danh sách cuộn (ScrollView, flex:1) ở giữa,
// thanh tổng tiền + nút Thanh toán cố định ngay phía trên TabBar (TabBar nằm ở App.tsx).
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { CartItem, CART_ITEMS } from "../data";

function CartRow({ item }: { item: CartItem }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.book.cover }} style={styles.rowImage} />
      {/* tên chiếm hết khoảng trống còn lại -> flex:1 */}
      <Text style={styles.rowName} numberOfLines={2}>
        {item.book.title}
      </Text>
      {/* số lượng + giá: width cố định để không bị lệch khi tên dài/ngắn */}
      <View style={styles.rowRight}>
        <Text style={styles.rowQty}>SL: {item.quantity}</Text>
        <Text style={styles.rowPrice}>{(item.book.price * item.quantity).toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

export function CartScreen() {
  // Cộng dồn giá * số lượng của tất cả sản phẩm trong giỏ
  const total = CART_ITEMS.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Danh sách sản phẩm: cuộn được */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CART_ITEMS.map((item) => (
          <CartRow key={item.book.id} item={item} />
        ))}
      </ScrollView>

      {/* Thanh tổng tiền + nút thanh toán: nằm NGOÀI ScrollView -> luôn cố định, không cuộn theo */}
      <View style={styles.checkoutBar}>
        <Text style={styles.totalText}>Tổng: {total.toLocaleString()} đ</Text>
        <Pressable style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  row: {
    flexDirection: "row", // ảnh - tên - (số lượng + giá) nằm ngang
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  rowImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: "#EEF2F7" },
  rowName: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
  rowRight: { width: 100, alignItems: "flex-end" },
  rowQty: { fontSize: 12, color: "#6B7280" },
  rowPrice: { fontSize: 13, fontWeight: "700", color: "#1E1B4B", marginTop: 2 },
  checkoutBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  totalText: { fontSize: 16, fontWeight: "700", color: "#1E1B4B" },
  checkoutBtn: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutBtnText: { color: "#FFFFFF", fontWeight: "700" },
});
