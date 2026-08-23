// Bài 28: Tạo class Animal với protected method makeSound(). Kế thừa Dog và Cat để ghi đè.

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // protected: chỉ truy cập được BÊN TRONG class này VÀ các lớp con kế thừa nó,
  // KHÔNG truy cập được từ bên ngoài (khác với private chỉ dùng được trong chính class đó)
  protected makeSound(): void {
    console.log(`${this.name} tạo ra một âm thanh chung chung`);
  }

  // Method public làm "cổng công bố" để kích hoạt makeSound() từ bên ngoài
  // vì bản thân makeSound() là protected nên không thể gọi trực tiếp từ bên ngoài
  performSound(): void {
    // Gọi method protected từ bên trong class -> hợp lệ
    this.makeSound();
  }
}

// Dog kế thừa Animal và GHI ĐÈ method protected makeSound()
class Dog extends Animal {
  // Ghi đè lại, vẫn có thể giữ nguyên mức độ truy cập protected hoặc nới lỏng thành public
  protected makeSound(): void {
    console.log(`${this.name} sủa: Gâu gâu!`);
  }
}

// Cat kế thừa Animal và GHI ĐÈ method protected makeSound()
class Cat extends Animal {
  protected makeSound(): void {
    console.log(`${this.name} kêu: Meo meo!`);
  }
}

// Tạo đối tượng và gọi method public performSound()
// performSound() sẽ gọi bên trong đến makeSound() - và nhờ tính đa hình,
// nó sẽ tự động gọi ĐÚNG phiên bản makeSound() đã bị ghi đè ở Dog/Cat
const dog1 = new Dog("Lu");
dog1.performSound();

const cat1 = new Cat("Miu");
cat1.performSound();

// Không thể gọi trực tiếp dog1.makeSound() từ bên ngoài vì đây là protected
// dog1.makeSound(); // Dòng này sẽ báo lỗi nếu bỏ comment

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
