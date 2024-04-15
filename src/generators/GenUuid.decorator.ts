import { faker } from "@faker-js/faker";
import { GenProperty } from "./GenProperty.decorator";

export const GenUuid = (): PropertyDecorator => {
  return GenProperty<string>({
    generationFn: () => faker.string.uuid(),
  });
};
