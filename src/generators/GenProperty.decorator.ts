import { appendPropertyMetadata } from "../factory/helpers/appendPropertyMetadata";

export interface GenPropertyOptions<T> {
  generationFn?: () => T;
  arrayLength?: number;
}

export function GenProperty<T>(options?: GenPropertyOptions<T>) {
  return function (target: any, propertyKey: string | symbol) {
    appendPropertyMetadata(target, propertyKey, options);
  };
}
