import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamList = {
  Home: { categoryId?: number } | undefined;
  Categories: undefined;
  Cart: undefined;
  Account: undefined;
};
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  BookDetail: { bookId: number };
  Checkout: { total: number };
  // redirectTo + total: đăng nhập xong thì quay lại đúng màn Thanh toán
  Login: { redirectTo?: "Checkout"; total?: number } | undefined;
  Register: { redirectTo?: "Checkout"; total?: number } | undefined;
  Wishlist: undefined;
  Orders: undefined;
  EditProfile: undefined;
  Notifications: undefined;
};
// → navigate("BookDetail", { bookId: 3 }) sai tên màn hoặc thiếu params sẽ bị TypeScript báo lỗi

// Props cho màn nằm trong Stack
export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Props cho màn nằm trong Tab: vừa gọi được navigate của Tab, vừa của Stack bên ngoài
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
