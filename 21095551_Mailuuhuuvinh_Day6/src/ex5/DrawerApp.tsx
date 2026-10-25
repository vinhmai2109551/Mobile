// Bài 5: Drawer gồm Home / Profile / Settings; Settings có 2 Switch bật/tắt
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { SettingsProvider, useSettings } from "./SettingsContext";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <Text style={[s.big, dark && s.lightText]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, dark && s.lightText]}>Nguyễn Văn An</Text>
      <Text style={[s.muted, dark && s.lightMuted]}>an.nguyen@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, dark, setNotify, setDark } = useSettings();
  return (
    <View style={[s.settingsRoot, dark && s.darkBg]}>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.lightText]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.lightText]}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, dark && s.lightMuted]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === "Home" ? "home-outline" : route.name === "Profile" ? "person-outline" : "settings-outline"}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
    </Drawer.Navigator>
  );
}

export function DrawerApp() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#111827" },
  big: { fontSize: 20, fontWeight: "700", color: colors.text },
  lightText: { color: "#fff" },
  muted: { fontSize: 13, color: colors.muted },
  lightMuted: { color: "#9CA3AF" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "700" },
  settingsRoot: { flex: 1, padding: 16, gap: 4 },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingLabel: { fontSize: 15, color: colors.text },
  status: { marginTop: 16, fontSize: 13, color: colors.muted },
});
