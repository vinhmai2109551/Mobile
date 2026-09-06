// Bài 23: Hàm async fetch danh sách todos và lọc những item CHƯA hoàn thành.

// Mô tả hình dạng 1 phần tử todo mà API trả về.
// Nhờ interface này, TypeScript biết t.completed là boolean, t.title là string...
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean; // true = đã xong, false = chưa xong
}

// Hàm async: luôn trả về Promise. Ở đây trả về Promise<Todo[]> (mảng todo chưa xong).
async function getPendingTodos(): Promise<Todo[]> {
  // fetch() gửi HTTP GET tới URL, trả về Promise<Response>.
  // await để dừng lại chờ server phản hồi rồi mới đi tiếp.
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  // res.ok là true khi mã trạng thái nằm trong khoảng 200-299.
  // Nếu không ok (404, 500...) thì chủ động ném lỗi để nhánh .catch() ở dưới bắt.
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // res.json() đọc toàn bộ body và parse chuỗi JSON thành object/array JS.
  // Nó cũng bất đồng bộ nên phải await. "as Todo[]" là ép kiểu cho TypeScript hiểu.
  const todos = (await res.json()) as Todo[];

  // filter() tạo mảng MỚI chỉ gồm phần tử thỏa điều kiện.
  // !t.completed đúng khi completed === false -> tức là todo CHƯA hoàn thành.
  return todos.filter((t) => !t.completed);
}

// Hàm chạy chính
async function main(): Promise<void> {
  // await lấy mảng kết quả từ hàm async ở trên
  const pending = await getPendingTodos();

  console.log("Số todo chưa hoàn thành:", pending.length);

  // slice(0, 5) lấy 5 phần tử đầu cho đỡ dài, rồi in từng cái
  pending.slice(0, 5).forEach((t) => console.log(`- #${t.id}: ${t.title}`));
}

// Gọi main(); nếu bất kỳ await nào ném lỗi thì .catch() nhận và in ra
main().catch((err) => console.log("Lỗi:", (err as Error).message));

export {};
