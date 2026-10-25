// Bài 3: Bottom Tab với 3 màn Home / Search / Profile
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <View style={s.card}>
      <Text style={s.cardName}>{phone.name.split(" - ")[0]}</Text>
      <Text style={s.cardPrice}>{formatPrice(phone.price)}</Text>
    </View>
  );
}

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => <PhoneCard phone={item} />}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");
  // lọc không phân biệt hoa/thường bằng toLowerCase + includes
  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return PHONES;
    return PHONES.filter((p) => p.name.toLowerCase().includes(q));
  }, [keyword]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
      {results.length === 0 ? (
        <Text style={s.empty}>Không có kết quả cho "{keyword}"</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => <PhoneCard phone={item} />}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={s.profileRoot}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={s.profileName}>Nguyễn Văn An</Text>
      <Text style={s.profileEmail}>an.nguyen@example.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: { padding: 14, borderRadius: 8, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, gap: 4 },
  cardName: { fontSize: 14, fontWeight: "600", color: colors.text },
  cardPrice: { fontSize: 13, color: colors.red, fontWeight: "700" },
  input: { margin: 16, height: 44, borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: 12 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24 },
  profileRoot: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "700" },
  profileName: { fontSize: 18, fontWeight: "700", color: colors.text },
  profileEmail: { fontSize: 13, color: colors.muted },
});
