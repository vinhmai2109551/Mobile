import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { BookCard } from "../components/BookCard";
import { ErrorView } from "../components/ErrorView";
import { HeartButton } from "../components/HeartButton";
import { LoadingView } from "../components/LoadingView";
import { PrimaryButton } from "../components/PrimaryButton";
import { RatingStars } from "../components/RatingStars";
import type { RootScreenProps } from "../navigation/types";
import { getBookById, getBooks } from "../services/bookService";
import { addReview, getReviewsByBook } from "../services/reviewService";
import { useAuth, useCart } from "../store/hooks";
import { colors, RADIUS } from "../theme";
import type { Book, Review } from "../types";
import { formatPrice } from "../utils/format";

export function BookDetailScreen({ navigation, route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params; // nhận bookId từ màn gửi
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form viết đánh giá
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const { items, add } = useCart();
  const { user, isLoggedIn } = useAuth();

  // Tải sách trước, rồi tải đánh giá và sách cùng danh mục song song
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const b = await getBookById(bookId);
      const [reviewList, sameCategory] = await Promise.all([
        getReviewsByBook(bookId),
        getBooks({ categoryId: b.categoryId }),
      ]);
      setBook(b);
      setReviews(reviewList);
      setRelated(sameCategory.filter((x) => x.id !== b.id)); // bỏ chính cuốn đang xem
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => { load(); }, [load]);

  // Điểm trung bình tính từ mảng reviews (không lưu riêng): reviews đổi thì điểm tự đổi
  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews],
  );

  const submitReview = async () => {
    if (!user) return;
    if (rating === 0) return setFormError("Vui lòng chọn số sao");
    if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");
    setFormError(null);
    setSending(true);
    try {
      const created = await addReview({
        bookId,
        userId: user.id,
        userName: user.name,
        rating,
        comment: comment.trim(),
      });
      setReviews((prev) => [created, ...prev]); // thêm vào đầu danh sách, không cần tải lại trang
      setRating(0);
      setComment("");
    } catch (e) {
      setFormError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  // Phải kiểm tra loading/lỗi trước khi dùng book, nếu không book.title sẽ lỗi khi book còn null
  if (loading) return <LoadingView label="Đang tải sách…" />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  const inCart = items.find((i) => i.bookId === book.id)?.quantity ?? 0;
  const soldOut = book.stock <= 0;

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.coverEmoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} size={38} style={styles.heart} />
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <View style={styles.ratingRow}>
        <RatingStars value={average} />
        <Text style={styles.ratingText}>
          {reviews.length ? `${average.toFixed(1)} (${reviews.length} đánh giá)` : "Chưa có đánh giá"}
        </Text>
      </View>
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
      {inCart > 0 && (
        <Text style={[styles.note, inCart >= book.stock && styles.noteMax]}>
          {inCart >= book.stock ? `Đã thêm tối đa ${book.stock} cuốn (hết tồn kho)` : `Trong giỏ: ${inCart} cuốn`}
        </Text>
      )}

      <Text style={styles.sectionTitle}>Đánh giá của độc giả</Text>
      <View style={styles.card}>
        {isLoggedIn ? (
          <>
            <Text style={styles.formLabel}>Viết đánh giá của bạn</Text>
            <RatingStars value={rating} size={30} onChange={setRating} />
            <Text style={styles.formLabel}>Bình luận</Text>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Cảm nhận của bạn về cuốn sách…"
              placeholderTextColor={colors.muted}
              multiline
            />
            {formError ? <Text style={styles.formError}>{formError}</Text> : null}
            <PrimaryButton title="Gửi đánh giá" onPress={submitReview} loading={sending} />
          </>
        ) : (
          <>
            <Text style={styles.loginHint}>Đăng nhập để viết đánh giá.</Text>
            <PrimaryButton title="Đăng nhập" variant="outline" onPress={() => navigation.navigate("Login")} />
          </>
        )}
      </View>

      {reviews.map((r) => (
        <View key={r.id} style={styles.review}>
          <View style={styles.reviewHead}>
            <Text style={styles.reviewName}>{r.userName}</Text>
            <RatingStars value={r.rating} size={13} />
          </View>
          <Text style={styles.reviewText}>{r.comment}</Text>
        </View>
      ))}

      {related.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Sách liên quan</Text>
          <FlatList
            horizontal
            data={related}
            keyExtractor={(b) => String(b.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
            renderItem={({ item }) => (
              // push (không phải navigate) để mở chồng thêm một trang chi tiết của cuốn khác
              <BookCard
                book={item}
                style={styles.relatedCard}
                onPress={() => navigation.push("BookDetail", { bookId: item.id })}
              />
            )}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 6, paddingBottom: 32 },
  cover: {
    height: 220,
    borderRadius: RADIUS,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  coverEmoji: { fontSize: 84 },
  heart: { position: "absolute", top: 12, right: 12 },
  title: { fontSize: 20, fontWeight: "800", color: colors.text },
  author: { fontSize: 13, color: colors.muted },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingText: { fontSize: 12, color: colors.muted },
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
  sectionTitle: { fontSize: 15, fontWeight: "800", color: colors.navy, marginTop: 18, marginBottom: 4 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 8 },
  formLabel: { fontSize: 12, fontWeight: "700", color: colors.text },
  commentInput: {
    minHeight: 70,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: colors.text,
    textAlignVertical: "top",
    outlineWidth: 0,
  },
  formError: { fontSize: 11, color: colors.danger },
  loginHint: { fontSize: 12, color: colors.muted },
  review: { backgroundColor: colors.card, borderRadius: 12, padding: 12, gap: 4, marginTop: 6 },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewName: { fontSize: 12, fontWeight: "800", color: colors.text },
  reviewText: { fontSize: 12, color: colors.text },
  relatedList: { gap: 12, paddingVertical: 4 },
  relatedCard: { width: 150, marginBottom: 0 },
});
