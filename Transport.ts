import { SealedClass, ToUpperCase } from './decorators';

export enum CustomDocumentType {
  Passport = 'Паспорт',
  DriverLicense = 'Водительское удостоверение',
  IDCard = 'ID-карта',
}

export interface Owner {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date;
  documentType: CustomDocumentType;
  documentSeries: string;
  documentNumber: string;
  displayInfo(): void;
}

export class Person implements Owner {
  constructor(
    public lastName: string,
    public firstName: string,
    public middleName: string,
    public birthDate: Date,
    public documentType: CustomDocumentType,
    public documentSeries: string,
    public documentNumber: string
  ) {}

  displayInfo(): void {
    console.log(
      `Владелец: ${this.lastName} ${this.firstName} ${this.middleName}, Дата рождения: ${this.birthDate.toDateString()}, Документ: ${this.documentType} ${this.documentSeries} ${this.documentNumber}`
    );
  }
}

export interface Vehicle {
  brand: string;
  model: string;
  year: number;
  vin: string;
  registrationNumber: string;
  owner: Owner;
  displayVehicleInfo(): void;
}

export class Transport implements Vehicle {
  constructor(
    public brand: string,
    public model: string,
    public year: number,
    public vin: string,
    public registrationNumber: string,
    public owner: Owner
  ) {}

  displayVehicleInfo(): void {
    console.log(
      `Транспортное средство: ${this.brand} ${this.model}, Год выпуска: ${this.year}, VIN: ${this.vin}, Рег. номер: ${this.registrationNumber}`
    );
  }
}

export enum CarBodyType {
  Sedan = 'Седан',
  SUV = 'Внедорожник',
  Coupe = 'Купе',
}

export enum CarClass {
  Economy = 'Эконом',
  Business = 'Бизнес',
  Premium = 'Премиум',
}

export interface Car extends Vehicle {
  bodyType: CarBodyType;
  carClass: CarClass;
}

@SealedClass
export class Automobile extends Transport implements Car {
  constructor(
    brand: string,
    model: string,
    year: number,
    vin: string,
    registrationNumber: string,
    owner: Owner,
    public bodyType: CarBodyType,
    public carClass: CarClass
  ) {
    super(brand, model, year, vin, registrationNumber, owner);
  }

  @ToUpperCase
  displayVehicleInfo(): void {
    super.displayVehicleInfo();
    console.log(`Тип кузова: ${this.bodyType}, Класс: ${this.carClass}`);
  }
}

export interface Motorbike extends Vehicle {
  frameType: string;
  isForSport: boolean;
}

export class Motorcycle extends Transport implements Motorbike {
  constructor(
    brand: string,
    model: string,
    year: number,
    vin: string,
    registrationNumber: string,
    owner: Owner,
    public frameType: string,
    public isForSport: boolean
  ) {
    super(brand, model, year, vin, registrationNumber, owner);
  }

  displayVehicleInfo(): void {
    super.displayVehicleInfo();
    console.log(`Тип рамы: ${this.frameType}, Спортивный: ${this.isForSport ? 'Да' : 'Нет'}`);
  }
}

export interface VehicleStorage<T extends Vehicle> {
  creationDate: Date;
  vehicles: T[];
  getAllVehicles(): T[];
}

export class Garage<T extends Vehicle> implements VehicleStorage<T> {
  vehicles: T[] = [];
  constructor(public creationDate: Date) {}

  getAllVehicles(): T[] {
    return this.vehicles;
  }

  addVehicle(vehicle: T): void {
    this.vehicles.push(vehicle);
  }
}
