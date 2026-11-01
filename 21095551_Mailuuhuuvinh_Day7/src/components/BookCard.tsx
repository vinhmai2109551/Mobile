import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, RADIUS } from "../theme";
import type { Book } from "../types";
import { formatPrice } from "../utils/format";

interface Props { book: Book; onPress: () => void; }

// Thẻ sách: "bìa" màu + emoji, bên dưới là tên, tác giả, giá
export function BookCard({ book, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        {/* hai hình tròn mờ trang trí cho giống bìa sách */}
        <View style={[styles.circle, styles.circleA]} />
        <View style={[styles.circle, styles.circleB]} />
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: RADIUS,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#0B1F5C",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cover: { height: 120, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  circle: { position: "absolute", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.15)" },
  circleA: { width: 90, height: 90, left: -25, bottom: -30 },
  circleB: { width: 60, height: 60, right: -15, top: -15 },
  emoji: { fontSize: 44 },
  info: { padding: 10, gap: 2 },
  title: { fontSize: 13, fontWeight: "700", color: colors.text, minHeight: 34 },
  author: { fontSize: 11, color: colors.muted },
  price: { fontSize: 13, fontWeight: "700", color: colors.indigo, marginTop: 2 },
});
