import { range } from "lodash";
import { GenPropertyMetadata } from "../types";
import { Type } from "../../types";

export const generateType = <T extends object>(Model: Type<T>): T => {
  const instance: any = new Model();
  const classProperties = Reflect.getMetadataKeys(instance);

  for (const property of classProperties) {
    const propertyOptions: GenPropertyMetadata = Reflect.getMetadata(
      property,
      instance
    );

    const isArray = propertyOptions?.arrayLength !== undefined ? true : false;

    if (isArray) {
      const array = range(0, propertyOptions?.arrayLength).map(() => {
        return propertyOptions?.generationFn?.();
      });

      instance[property] = array;
    } else {
      const value = propertyOptions?.generationFn?.();
      instance[property] = value;
    }
  }

  return instance;
};
