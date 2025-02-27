// Декоратор для блокировки изменения прототипа класса
function SealedClass(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Декоратор для преобразования возвращаемой строки в верхний регистр
function ToUpperCase(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const result = originalMethod.apply(this, args);
    if (typeof result === 'string') {
      return result.toUpperCase();
    }
    return result;
  };

  return descriptor;
}

exports.SealedClass = SealedClass;
exports.ToUpperCase = ToUpperCase;
