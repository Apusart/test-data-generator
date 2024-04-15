import { faker } from "@faker-js/faker";

import { GenProperty } from "./GenProperty.decorator";

export const GenBoolean = (): PropertyDecorator =>
  GenProperty({
    generationFn: () => {
      return faker.datatype.boolean();
    },
  });
