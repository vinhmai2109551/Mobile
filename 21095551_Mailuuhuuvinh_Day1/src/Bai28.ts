// Bài 28: Class Animal có protected method makeSound(). Dog và Cat override lại.

class Animal {
  // protected: chỉ gọi được trong chính class này hoặc các lớp con, không gọi từ bên ngoài
  protected makeSound(): void {
    console.log("Con vật kêu...");
  }

  // method public để "lộ" hành vi ra ngoài, bên trong gọi makeSound() đã bị override
  performSound(): void {
    this.makeSound();
  }
}

class Dog extends Animal {
  protected makeSound(): void {
    console.log("Gâu gâu!");
  }
}

class Cat extends Animal {
  protected makeSound(): void {
    console.log("Meo meo!");
  }
}

new Dog().performSound();
new Cat().performSound();
// new Dog().makeSound(); // lỗi vì makeSound là protected

export {};
