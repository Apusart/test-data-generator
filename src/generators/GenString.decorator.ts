import { StringModule, faker } from "@faker-js/faker";
import { get } from "lodash";

import { GenProperty } from "./GenProperty.decorator";

type FakerStringType = Exclude<keyof StringModule, "fromCharacters" | "uuid">;

export interface GenStringOptions {
  type: FakerStringType;
  options?: Parameters<StringModule[FakerStringType]>[0];
}

export const GenString = (
  options: GenStringOptions = { type: "alphanumeric", options: undefined }
): PropertyDecorator => {
  return GenProperty<string>({
    generationFn: () => faker.string[options.type](options?.options as any),
  });
};
