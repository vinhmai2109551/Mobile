# 21095551_Mailuuhuuvinh_Day1

Bai tap thuc hanh OOP voi TypeScript - 30 bai (Bai01.ts -> Bai30.ts trong thu muc `src/`).

Moi file la mot bai tap doc lap: co class/interface theo dung de bai, phan code demo o cuoi file,
va comment giai thich tung dong bang tieng Viet.

## Cai dat

```bash
npm install
```

## Chay mot bai cu the

```bash
npx ts-node src/Bai01.ts
```

Hoac dung script co san trong package.json, vi du:

```bash
npm run bai01
npm run bai17
```

## Bien dich toan bo sang JavaScript

```bash
npm run build
```

File JS sau khi bien dich se nam trong thu muc `dist/`.

## Danh sach bai tap

1. Person - hien thi thong tin
2. Student ke thua Person + grade
3. Car - hien thi thong tin xe
4. Rectangle - tinh dien tich, chu vi
5. BankAccount - deposit/withdraw
6. Book - thuoc tinh sach
7. User - private + getter/setter
8. Product - filter mang gia > 100
9. interface Animal - name + sound()
10. Account - public/private/readonly
11. Animal -> Dog, Cat (bark/meow)
12. interface Flyable, Swimmable -> Bird, Fish
13. abstract Shape -> Square, Circle
14. Employee -> Manager, Developer
15. Library chua Book va User
16. generic class Box<T>
17. Singleton Logger
18. static class MathUtil
19. Polymorphism voi Animal/Dog/Cat
20. interface Vehicle -> Car, Bike
21. generic Repository<T>
22. Stack<T> (push/pop/peek/isEmpty)
23. interface Payment -> CashPayment, CardPayment
24. abstract Appliance -> Fan, AirConditioner
25. Shape - static method describe()
26. Order chua danh sach Product, tinh tong tien
27. Teacher ke thua Person + subject
28. Animal protected makeSound() -> Dog, Cat override
29. interface Movable -> Car, Robot
30. School chua danh sach Student va Teacher
