import { faker } from "@faker-js/faker";

import { GenProperty } from "./GenProperty.decorator";

export const GenEnum = <T extends Record<string | number, string | number>>(
  enumType: T
): PropertyDecorator =>
  GenProperty<T[keyof T]>({
    generationFn: () => {
      return faker.helpers.enumValue(enumType);
    },
  });
