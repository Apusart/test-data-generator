import { NumberModule, faker } from "@faker-js/faker";

import { GenProperty } from "./GenProperty.decorator";

type FakerNumberType = keyof NumberModule;

export interface GenNumberOptions {
  type: FakerNumberType;
  options?: Parameters<NumberModule[FakerNumberType]>[0];
}

export const GenNumber = (
  options: GenNumberOptions = { type: "int", options: undefined }
): PropertyDecorator => {
  return GenProperty<number | string | bigint>({
    generationFn: () => faker.number[options.type](options?.options as any),
  });
};
