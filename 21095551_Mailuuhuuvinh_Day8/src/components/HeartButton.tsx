import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props { bookId: number; size?: number; style?: StyleProp<ViewStyle>; }

// Nút tim đọc/ghi cùng một store wishlist nên mọi nơi (lưới, chi tiết, màn Yêu thích) luôn khớp nhau
export function HeartButton({ bookId, size = 34, style }: Props) {
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);
  return (
    <Pressable
      onPress={() => toggle(bookId)}
      hitSlop={6}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      style={[styles.button, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={{ fontSize: size * 0.6, lineHeight: size * 0.75, color: fav ? colors.heart : colors.muted }}>
        {fav ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center" },
});
