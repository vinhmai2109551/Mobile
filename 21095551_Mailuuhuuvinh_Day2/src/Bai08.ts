// Bài 8: Promise chain - lần lượt: bình phương số 2, rồi nhân đôi, rồi cộng 5.

// Bắt đầu chuỗi bằng Promise.resolve(2): tạo Promise đã hoàn thành với giá trị 2
Promise.resolve(2)
  .then((n) => {
    const result = n * n; // bình phương: 2 -> 4
    console.log("Bình phương:", result);
    return result; // giá trị return được truyền sang .then() kế tiếp
  })
  .then((n) => {
    const result = n * 2; // nhân đôi: 4 -> 8
    console.log("Nhân đôi:", result);
    return result;
  })
  .then((n) => {
    const result = n + 5; // cộng 5: 8 -> 13
    console.log("Cộng 5:", result);
    return result;
  })
  .then((finalValue) => console.log("Kết quả cuối:", finalValue));

export {};
