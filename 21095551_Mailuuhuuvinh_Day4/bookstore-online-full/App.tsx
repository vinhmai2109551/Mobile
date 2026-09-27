// GIỜ 4 + 5: Ráp toàn bộ ứng dụng — SafeAreaView(flex:1) > vùng màn hình hiện tại
// (chứa FloatingCartButton nổi bên trong) > TabBar cố định dưới cùng.
// Chuyển màn hình chỉ bằng useState (không dùng thư viện navigation thật) — đúng tinh thần
// "chỉ dựng LAYOUT tĩnh" của đề, state ở đây chỉ để xem được đủ các màn hình đã dựng.
import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FloatingCartButton } from "./components/FloatingCartButton";
import { TabBar, TabKey } from "./components/TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { PlaceholderScreen } from "./screens/PlaceholderScreen";
import { BOOKS } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home"); // tab đang chọn: home/category/cart/account
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null); // null = không xem chi tiết sách nào
  const [cartCount, setCartCount] = useState(0); // số hiện trên badge của FloatingCartButton

  // Tìm sách đang xem chi tiết dựa vào id đã lưu; không có id -> undefined
  const selectedBook = selectedBookId != null ? BOOKS.find((b) => b.id === selectedBookId) : undefined;

  // Chọn màn hình sẽ hiển thị: ưu tiên BookDetail nếu đang chọn 1 cuốn sách,
  // không thì hiển thị theo tab đang active
  function renderScreen() {
    if (selectedBook) {
      return (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)} // bấm quay lại -> bỏ chọn sách, về lại tab cũ
          onAddToCart={() => setCartCount((n) => n + 1)} // bấm thêm vào giỏ -> tăng badge số lượng
        />
      );
    }
    switch (activeTab) {
      case "home":
        return <HomeScreen onPressBook={(id) => setSelectedBookId(id)} />; // bấm 1 sách -> mở chi tiết
      case "cart":
        return <CartScreen />;
      case "category":
        return <PlaceholderScreen label="Danh mục" />;
      case "account":
        return <PlaceholderScreen label="Tài khoản" />;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Vùng nội dung: containing block cho FloatingCartButton (position:'absolute') */}
      <View style={styles.screenArea}>
        {renderScreen()}
        {/* Nút giỏ nổi chỉ hiện ở tab Home; bấm vào -> chuyển sang tab Cart */}
        {activeTab === "home" && !selectedBook && (
          <FloatingCartButton count={cartCount} onPress={() => setActiveTab("cart")} />
        )}
      </View>

      {/* TabBar cố định đáy màn hình, KHÔNG hiện khi đang xem chi tiết sách */}
      {!selectedBook && <TabBar active={activeTab} onChange={setActiveTab} />}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  screenArea: { flex: 1 },
});
