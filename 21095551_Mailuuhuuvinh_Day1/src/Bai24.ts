// Bài 24: Abstract class Appliance có method turnOn(). Fan và AirConditioner implement.

abstract class Appliance {
  abstract turnOn(): void;
}

class Fan extends Appliance {
  turnOn(): void {
    console.log("Quạt đang bật");
  }
}

class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Máy lạnh đang bật");
  }
}

const devices: Appliance[] = [new Fan(), new AirConditioner()];
devices.forEach((d) => d.turnOn());

export {};
