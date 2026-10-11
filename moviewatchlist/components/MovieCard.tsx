// components/MovieCard.tsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

// Câu 3: interface đủ các trường dữ liệu từ mockapi
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  poster: string;
  watched: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
  layout?: "row" | "poster"; // Câu 4 — mặc định "row"
}

function MovieCardBase({ movie, onSelect, layout = "row" }: MovieCardProps) {
  const ratingText = movie.rating.toFixed(1);

  if (layout === "poster") {
    return (
      <Pressable style={styles.posterCard} onPress={() => onSelect(movie.id)}>
        <View style={styles.posterWrap}>
          <Image source={{ uri: movie.poster }} style={styles.posterImage} />
          {/* huy hiệu điểm, góc trên phải */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>⭐ {ratingText}</Text>
          </View>
          {/* chip "Đã xem", góc dưới trái, chỉ hiện khi đã xem */}
          {movie.watched && (
            <View style={styles.watchedChip}>
              <Text style={styles.watchedChipText}>✓ Đã xem</Text>
            </View>
          )}
        </View>
        <Text style={styles.posterTitle} numberOfLines={2}>
          {movie.title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.rowCard} onPress={() => onSelect(movie.id)}>
      <Image source={{ uri: movie.poster }} style={styles.rowPoster} />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>{movie.title}</Text>
        <Text style={styles.rowMeta}>
          {movie.director} · {movie.year}
        </Text>
        <Text style={styles.rowRating}>⭐ {ratingText}</Text>
        <Text>{movie.watched ? "✅ Đã xem" : "🎬 Chưa xem"}</Text>
      </View>
    </Pressable>
  );
}

// Câu 3: React.memo để tránh render lại thẻ khi props không đổi
export const MovieCard = React.memo(MovieCardBase);

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  rowPoster: { width: 70, height: 105, borderRadius: 6, backgroundColor: "#eee" },
  rowInfo: { flex: 1, justifyContent: "center" },
  rowTitle: { fontSize: 16, fontWeight: "700" },
  rowMeta: { color: "#6B7280", marginTop: 2 },
  rowRating: { marginTop: 4, fontWeight: "600" },

  posterCard: { marginBottom: 16 },
  posterWrap: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  posterImage: { width: "100%", height: "100%" },
  ratingBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingBadgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  watchedChip: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "#16A34A",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  watchedChipText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  posterTitle: { marginTop: 6, fontWeight: "600" },
});