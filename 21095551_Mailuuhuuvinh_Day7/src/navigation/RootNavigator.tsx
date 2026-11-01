import { createNativeStackNavigator, type NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { colors } from "../theme";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Header navy chữ trắng cho các màn trong Stack (có nút ← tự động)
const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "700" },
  headerBackButtonDisplayMode: "minimal", // iOS chỉ hiện mũi tên, không hiện chữ "Back"
  contentStyle: { backgroundColor: colors.bg },
};

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      {/* Tabs có header riêng từng màn nên ẩn header của Stack */}
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      {/* BookDetail nằm ở Stack nên phủ lên cả Tab Bar */}
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Chi tiết sách" }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh toán" }} />
    </Stack.Navigator>
  );
}
