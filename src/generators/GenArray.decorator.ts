import { appendPropertyMetadata } from "../factory/helpers/appendPropertyMetadata";

export interface GenArrayOptions {
  arrayLength?: number;
}

export const GenArray = (arrayLength: number = 1): PropertyDecorator =>
  function (target: any, propertyKey: string | symbol) {
    appendPropertyMetadata(target, propertyKey, { arrayLength });
  };
