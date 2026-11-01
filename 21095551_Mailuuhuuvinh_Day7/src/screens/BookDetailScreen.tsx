import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import type { RootScreenProps } from "../navigation/types";
import { getBookById } from "../services/bookService";
import { useCart, useWishlist } from "../store/hooks";
import { colors, RADIUS } from "../theme";
import type { Book } from "../types";
import { formatPrice } from "../utils/format";

export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params; // nhận bookId từ màn gửi
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { items, add } = useCart();
  const { isFavorite, toggle } = useWishlist();

  // Gọi GET /books/:id, tải lại mỗi khi bookId đổi
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBook(await getBookById(bookId));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => { load(); }, [load]);

  // Phải kiểm tra loading/lỗi trước khi dùng book, nếu không book.title sẽ lỗi khi book còn null
  if (loading) return <LoadingView label="Đang tải sách…" />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  const inCart = items.find((i) => i.bookId === book.id)?.quantity ?? 0;
  const soldOut = book.stock <= 0;
  const favorite = isFavorite(book.id);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.coverEmoji}>{book.emoji}</Text>
        {/* nút yêu thích ♡/♥ ở góc bìa */}
        <Pressable style={styles.heart} onPress={() => toggle(book.id)} hitSlop={8}>
          <Text style={[styles.heartText, favorite && styles.heartActive]}>{favorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>{soldOut ? "Hết hàng" : `Còn ${book.stock} cuốn`}</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <Pressable
        disabled={soldOut}
        style={[styles.button, soldOut && styles.buttonDisabled]}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.buttonText}>{soldOut ? "Hết hàng" : "Thêm vào giỏ"}</Text>
      </Pressable>

      {/* cho người dùng biết số lượng trong giỏ và khi nào đã chạm trần tồn kho */}
      {inCart > 0 && (
        <Text style={[styles.note, inCart >= book.stock && styles.noteMax]}>
          {inCart >= book.stock ? `Đã thêm tối đa ${book.stock} cuốn (hết tồn kho)` : `Trong giỏ: ${inCart} cuốn`}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 6 },
  cover: {
    height: 220,
    borderRadius: RADIUS,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  coverEmoji: { fontSize: 84 },
  heart: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  heartText: { fontSize: 22, color: colors.muted, lineHeight: 26 },
  heartActive: { color: colors.danger },
  title: { fontSize: 20, fontWeight: "800", color: colors.text },
  author: { fontSize: 13, color: colors.muted },
  price: { fontSize: 18, fontWeight: "800", color: colors.indigo, marginTop: 2 },
  stock: { fontSize: 12, color: colors.muted },
  desc: { fontSize: 13, color: colors.text, lineHeight: 20, marginTop: 6 },
  button: {
    marginTop: 14,
    backgroundColor: colors.indigo,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  note: { textAlign: "center", fontSize: 12, color: colors.muted, marginTop: 6 },
  noteMax: { color: colors.danger, fontWeight: "600" },
});
