import { appendPropertyMetadata } from "../factory/helpers/appendPropertyMetadata";

export interface GenPropertyOptions<T> {
  generationFn?: () => T;
}

export function GenProperty<T>(options?: GenPropertyOptions<T>) {
  return function (target: any, propertyKey: string | symbol) {
    appendPropertyMetadata(target, propertyKey, options);
  };
}

function GenYourType() {
  return GenProperty({
    generationFn: () => {
      // Your generation logic here
      return "Your generated value";
    },
  });
}
