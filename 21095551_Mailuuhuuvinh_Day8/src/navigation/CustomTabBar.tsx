import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = { Home: "🏠", Categories: "🗂️", Cart: "🛒", Account: "👤" };

// Cầu nối: đổi state của React Navigation thành mảng items cho TabBar vẽ
export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart();

  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    badge: route.name === "Cart" ? totalQuantity : undefined, // badge chỉ ở tab Giỏ hàng
  }));

  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;
    const isFocused = state.routes[state.index].key === key;
    // phát sự kiện tabPress để màn hình có thể chặn việc chuyển tab
    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
    // tab chưa mở và không bị chặn thì mới chuyển
    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
  };

  return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />;
}
