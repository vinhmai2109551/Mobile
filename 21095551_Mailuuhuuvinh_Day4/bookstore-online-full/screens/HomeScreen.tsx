// GIỜ 4 — Bài tập 1: Màn hình Trang chủ BookStore hoàn chỉnh
// Ghép Header (cố định) + ScrollView (Chips + Grid, cuộn được).
// FloatingCartButton KHÔNG đặt ở đây mà đặt ở App.tsx (ngoài cùng), vì nó cần nổi
// bên trên cả TabBar dưới cùng chứ không chỉ nổi trên riêng màn Home.
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../data";

export function HomeScreen({ onPressBook }: { onPressBook: (id: number) => void }) {
  return (
    <View style={styles.container}>
      {/* Header nằm NGOÀI ScrollView -> đứng yên khi cuộn */}
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <CategoryChips />
        {/* onPressBook được App.tsx truyền vào -> bấm 1 sách sẽ mở màn Chi tiết */}
        <BookGrid books={BOOKS} onPressBook={onPressBook} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 90, gap: 16 }, // paddingBottom chừa chỗ cho nút giỏ nổi
});
