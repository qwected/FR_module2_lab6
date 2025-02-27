import { Person, CustomDocumentType, Automobile, Motorcycle, CarBodyType, CarClass, Vehicle, Garage } from './Transport';

function getCurrentDate(): void {
  console.log(new Date().toLocaleTimeString());
}

function startClock(): void {
  const intervalId = setInterval(() => {
    getCurrentDate();
  }, 5000);

  setTimeout(() => {
    console.log("1 минута прошла. Таймер остановлен.");
    clearInterval(intervalId);
  }, 60000);
}

const owner = new Person(
  'Иванов',
  'Иван',
  'Иванович',
  new Date(1985, 6, 15),
  CustomDocumentType.Passport,
  '1234',
  '567890'
);

const car = new Automobile(
  'Toyota',
  'Camry',
  2022,
  'JTDBE32K502109123',
  'А123ВС77',
  owner,
  CarBodyType.Sedan,
  CarClass.Business
);

const bike = new Motorcycle(
  'Yamaha',
  'YZF-R1',
  2021,
  'JYARN23E5DA004321',
  'Б456СД78',
  owner,
  'Спортивная',
  true
);

const garage = new Garage<Vehicle>(new Date());
garage.addVehicle(car);
garage.addVehicle(bike);

console.log('--- Владелец ---');
owner.displayInfo();

console.log('--- Автомобиль ---');
car.displayVehicleInfo();

console.log('--- Мотоцикл ---');
bike.displayVehicleInfo();

console.log('--- Список ТС в гараже ---');
const vehicles = garage.getAllVehicles();
vehicles.forEach(vehicle => vehicle.displayVehicleInfo());

// Проверка блокировки изменения прототипа
try {
  (car as any).newProperty = 'Test'; // Это должно вызвать ошибку, если декоратор работает правильно
} catch (e) {
  console.log('Изменение прототипа заблокировано:', e.message);
}

startClock();
