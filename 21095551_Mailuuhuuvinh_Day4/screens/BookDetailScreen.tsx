// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách (Book Detail)
// Cấu trúc: ảnh bìa lớn cố định trên cùng (alignSelf:'center') > ScrollView riêng (flex:1)
// chứa tên/tác giả/giá/mô tả dài > thanh "Thêm vào giỏ" cố định dưới cùng, NGOÀI ScrollView.
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

// book: sách đang xem | onBack: bấm quay lại | onAddToCart: bấm thêm vào giỏ
export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <View style={styles.container}>
      {/* Nút quay lại Home, chạy hàm onBack được truyền từ App.tsx */}
      <Pressable style={styles.backRow} onPress={onBack}>
        <Text style={styles.backText}>‹ Quay lại</Text>
      </Pressable>

      {/* Ảnh bìa lớn: nằm NGOÀI ScrollView -> cố định, không cuộn theo.
          Căn giữa, width theo %, aspectRatio giữ tỉ lệ dù width co giãn */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* Phần nội dung dài (tên, tác giả, giá, mô tả) -> cho vào ScrollView riêng
          để không bị tràn/đẩy mất thanh "Thêm vào giỏ" cố định phía dưới */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        {/* toLocaleString() đổi 89000 -> "89,000" cho dễ đọc */}
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: nằm NGOÀI ScrollView (anh em, không phải con bên trong)
          -> luôn đứng yên, không bị cuộn mất dù mô tả ở trên dài cỡ nào */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        <Pressable style={styles.addBtn} onPress={onAddToCart}>
          <Text style={styles.addBtnText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" }, // flex:1 = chiếm hết màn hình
  backRow: { paddingHorizontal: 16, paddingVertical: 12 },
  backText: { color: "#4338CA", fontWeight: "600" },
  cover: {
    alignSelf: "center", // căn giữa theo chiều ngang
    width: "60%",
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width là %
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },
  scroll: { flex: 1, marginTop: 16 }, // flex:1 -> chiếm hết khoảng trống còn lại giữa ảnh và thanh dưới
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 }, // style cho NỘI DUNG bên trong ScrollView
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  author: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  price: { fontSize: 18, fontWeight: "700", color: "#1E1B4B", marginTop: 8 },
  description: { fontSize: 14, lineHeight: 21, color: "#374151", marginTop: 12 },
  bottomBar: {
    flexDirection: "row", // giá bên trái, nút bên phải, nằm ngang
    justifyContent: "space-between", // đẩy 2 phần tử về 2 đầu, cách xa nhau tối đa
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomPrice: { fontSize: 16, fontWeight: "700", color: "#1E1B4B" },
  addBtn: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addBtnText: { color: "#FFFFFF", fontWeight: "700" },
});
