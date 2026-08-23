// 9. Define an interface Animal with name and method sound().
// Bài 9: Định nghĩa interface Animal với name và method sound().

// interface chỉ mô tả "hình dạng"/hợp đồng mà một object phải có, không chứa code hiện thực
interface Animal {
  // Bắt buộc object thực thi interface này phải có thuộc tính name kiểu string
  name: string;
  // Bắt buộc phải có method sound() trả về string
  sound(): string;
}

// Tạo một object thường (literal object) và gán kiểu là Animal
// TypeScript sẽ kiểm tra object này có đủ các thuộc tính/method theo interface không
const dog: Animal = {
  name: "Chó",
  // Hiện thực method sound() theo đúng interface đã khai báo
  sound(): string {
    return "Gâu gâu";
  },
};

// Tạo thêm một object khác cùng tuân theo interface Animal
const cat: Animal = {
  name: "Mèo",
  sound(): string {
    return "Meo meo";
  },
};

// In kết quả: gọi method sound() của từng con vật
console.log(`${dog.name} kêu: ${dog.sound()}`);
console.log(`${cat.name} kêu: ${cat.sound()}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
