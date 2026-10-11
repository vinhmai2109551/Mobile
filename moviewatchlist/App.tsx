// App.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  Switch,
  Alert,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MovieCard, Movie } from "./components/MovieCard";

// Câu Chuẩn bị: URL API của BẠN (tạo trên mockapi.io) — GIỮ NGUYÊN, không xoá.
export const API_URL = "https://6acb2a94ef37b15040778950.mockapi.io/movies";

// Hàm gọi API (GET) — GIỮ NGUYÊN, không xoá.
export async function fetchMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Gọi API thất bại: " + res.status);
  }
  return res.json();
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Câu 5: 2 công tắc độc lập
  const [posterMode, setPosterMode] = useState(false); // "Dạng poster"
  const [unwatchedOnly, setUnwatchedOnly] = useState(false); // "Chưa xem"

  // Câu 2 + Câu 6: tải dữ liệu — dùng chung cho lần đầu, nút "Thử lại", và kéo refresh
  const loadMovies = useCallback(async () => {
    try {
      setError(false);
      const data = await fetchMovies();
      setMovies(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false); // Câu 6: tắt vòng xoay dù thành công hay lỗi
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Câu 6: kéo xuống để tải lại — không đổi posterMode/unwatchedOnly nên tự giữ nguyên
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadMovies();
  }, [loadMovies]);

  // Câu 3: bấm thẻ phim -> Alert; useCallback để MovieCard (React.memo) không render lại oan
  const handleSelectMovie = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) {
        Alert.alert(movie.title, "Đạo diễn: " + movie.director);
      }
    },
    [movies]
  );

  // Câu 5: lọc "Chưa xem" — tính bằng useMemo, chỉ tính lại khi movies/unwatchedOnly đổi
  const filteredMovies = useMemo(() => {
    if (!unwatchedOnly) return movies;
    return movies.filter((m) => !m.watched);
  }, [movies, unwatchedOnly]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Câu 1 */}
        <Text style={styles.heading}>Movie Watchlist</Text>

        {/* Câu 5 */}
        <View style={styles.switchRow}>
          <Text>Dạng poster</Text>
          <Switch value={posterMode} onValueChange={setPosterMode} />
        </View>
        <View style={styles.switchRow}>
          <Text>Chưa xem</Text>
          <Switch value={unwatchedOnly} onValueChange={setUnwatchedOnly} />
        </View>

        {/* Câu 2: trạng thái lỗi */}
        {error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>Không tải được danh sách phim.</Text>
            <Pressable style={styles.retryBtn} onPress={loadMovies}>
              <Text style={styles.retryText}>Thử lại</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id}
            key={posterMode ? "poster" : "row"} // đổi numColumns bắt buộc đổi key để remount
            numColumns={posterMode ? 2 : 1}
            columnWrapperStyle={posterMode ? styles.gridRow : undefined}
            contentContainerStyle={styles.listContent}
            refreshControl={
              // Câu 6
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              // Câu 6
              <Text style={styles.emptyText}>Không có phim nào để hiển thị.</Text>
            }
            renderItem={({ item }) => (
              <View style={posterMode ? styles.gridItem : undefined}>
                <MovieCard
                  movie={item}
                  layout={posterMode ? "poster" : "row"} // Câu 4
                  onSelect={handleSelectMovie} // Câu 3
                />
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  errorText: { color: "red", marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "700" },
  listContent: { padding: 12 },
  gridRow: { justifyContent: "space-between" },
  gridItem: { width: "48%" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#6B7280" },
});