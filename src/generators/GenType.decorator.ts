import { GenProperty } from "./GenProperty.decorator";
import { generateType } from "../factory/helpers/generateType";
import { Type } from "../types";

export const GenType = <T extends object>(model: Type<T>): PropertyDecorator =>
  GenProperty<T>({
    generationFn: () => generateType(model),
  });
