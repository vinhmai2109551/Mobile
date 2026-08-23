// Bài 7: Viết class User với thuộc tính name là private và có getter/setter.

class User {
  // Từ khóa private: chỉ truy cập được bên trong class User, không truy cập được từ bên ngoài
  private name: string;

  constructor(name: string) {
    // Bên trong class vẫn có thể gán giá trị cho thuộc tính private
    this.name = name;
  }

  // Getter: cho phép đọc giá trị của name từ bên ngoài như một thuộc tính (không cần dấu ngoặc)
  get userName(): string {
    return this.name;
  }

  // Setter: cho phép gán giá trị mới cho name từ bên ngoài, có thể kèm kiểm tra hợp lệ
  set userName(newName: string) {
    // Kiểm tra tên không được rỗng
    if (newName.trim().length === 0) {
      console.log("Tên không được để trống!");
      return;
    }
    this.name = newName;
  }
}

// Tạo đối tượng User
const user1 = new User("Mai Lưu Hữu Vinh");
// Đọc giá trị thông qua getter (gọi như thuộc tính, không phải method)
console.log(`Tên hiện tại: ${user1.userName}`);
// Gán giá trị mới thông qua setter
user1.userName = "Mai Hữu Vinh";
// Đọc lại giá trị sau khi đã đổi
console.log(`Tên sau khi đổi: ${user1.userName}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
