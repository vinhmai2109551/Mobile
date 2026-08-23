// Bài 17: Viết class Logger theo mô hình Singleton, ghi log ra console.

// Singleton: một mẫu thiết kế đảm bảo CHỈ CÓ DUY NHẤT MỘT đối tượng của class này
// tồn tại trong suốt chương trình, mọi nơi gọi đến đều dùng chung 1 instance.
class Logger {
  // Biến static lưu instance duy nhất của Logger, thuộc về CLASS chứ không thuộc về từng đối tượng
  // private để không ai có thể tạo instance mới từ bên ngoài bằng cách truy cập trực tiếp
  private static instance: Logger;

  // Constructor được đánh dấu private -> ngăn không cho gọi "new Logger()" từ bên ngoài class
  private constructor() {}

  // Method static (gọi qua tên class: Logger.getInstance()) để lấy về instance duy nhất
  static getInstance(): Logger {
    // Nếu instance chưa tồn tại (lần gọi đầu tiên) thì mới tạo mới
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    // Nếu đã tồn tại rồi thì trả về chính instance cũ, không tạo mới nữa
    return Logger.instance;
  }

  // Method ghi log ra console, kèm theo nhãn thời gian
  log(message: string): void {
    console.log(`[LOG ${new Date().toISOString()}] ${message}`);
  }
}

// Lấy instance Logger lần đầu tiên
const logger1 = Logger.getInstance();
logger1.log("Bắt đầu chương trình");

// Lấy instance Logger lần thứ hai ở một nơi khác trong code
const logger2 = Logger.getInstance();
logger2.log("Xử lý dữ liệu");

// Kiểm tra logger1 và logger2 có phải là CÙNG MỘT đối tượng hay không
console.log(`logger1 và logger2 là cùng 1 đối tượng? ${logger1 === logger2}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
