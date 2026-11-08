// Hai mã giảm giá cố định ở phía client (BT8.C2)
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000đ", discount: (s) => Math.min(50000, s) }, // không giảm quá tạm tính
};

// Chuẩn hoá mã (bỏ khoảng trắng, viết hoa); mã sai trả về null
export function findCoupon(input: string) {
  const code = input.trim().toUpperCase();
  const coupon = COUPONS[code];
  return coupon ? { code, label: coupon.label } : null;
}

// Số tiền được giảm của một mã (mã null = 0)
export const discountOf = (code: string | null, subtotal: number) =>
  code && COUPONS[code] ? COUPONS[code].discount(subtotal) : 0;
