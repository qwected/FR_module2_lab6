// Декоратор для блокировки изменения прототипа класса
export function SealedClass(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Декоратор для преобразования возвращаемой строки в верхний регистр
export function ToUpperCase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    if (typeof result === 'string') {
      return result.toUpperCase();
    }
    return result;
  };

  return descriptor;
}
