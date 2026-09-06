// Bài 27: fetchWithRetry(url, retries) - thử lại tối đa `retries` lần nếu gọi API thất bại.

// unreliableFetch: fetch giả lập, ngẫu nhiên thất bại ~60% để thấy cơ chế retry hoạt động.
async function unreliableFetch(url: string): Promise<string> {
  const ok = Math.random() > 0.6;
  await new Promise((r) => setTimeout(r, 500)); // giả lập độ trễ mạng
  if (!ok) throw new Error("Kết nối thất bại");
  return `Dữ liệu từ ${url}`;
}

// fetchWithRetry: gọi fn; nếu lỗi thì chờ một chút rồi thử lại,
// tối đa `retries` lần. Hết lượt vẫn lỗi thì ném lỗi cuối cùng ra ngoài.
async function fetchWithRetry(url: string, retries: number): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const data = await unreliableFetch(url);
      console.log(`Lần ${attempt}: thành công`);
      return data;
    } catch (err) {
      console.log(`Lần ${attempt}: ${(err as Error).message}`);
      // Nếu đây là lần cuối thì ném lỗi ra, không thử nữa
      if (attempt === retries) throw err;
      // Chưa phải lần cuối -> chờ 1 giây rồi lặp tiếp
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  // Dòng này không bao giờ tới, chỉ để TypeScript yên tâm về kiểu trả về
  throw new Error("unreachable");
}

async function main(): Promise<void> {
  try {
    const result = await fetchWithRetry("https://api.example.com/data", 4);
    console.log("Kết quả:", result);
  } catch (err) {
    console.log("Bỏ cuộc sau khi thử hết:", (err as Error).message);
  }
}

main();

export {};
