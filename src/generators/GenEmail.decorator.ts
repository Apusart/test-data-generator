import { faker } from "@faker-js/faker";

import { GenProperty } from "./GenProperty.decorator";

export type GenEmailOptions = Parameters<typeof faker.internet.email>[0];

export const GenEmail = (options?: GenEmailOptions): PropertyDecorator =>
  GenProperty({
    generationFn: () => {
      return faker.internet.email(options);
    },
  });
