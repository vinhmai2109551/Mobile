// Bài 9: Định nghĩa interface Animal có name và method sound().

interface Animal {
  name: string;
  sound(): string;
}

// Một object bất kỳ chỉ cần đúng "hình dạng" của interface là hợp lệ
const dog: Animal = {
  name: "Milo",
  sound(): string {
    return "Gâu gâu";
  },
};

console.log(`${dog.name} kêu: ${dog.sound()}`);

export {};
