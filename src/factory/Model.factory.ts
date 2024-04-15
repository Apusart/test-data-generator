import { Type } from "../types";
import { generateType } from "./helpers/generateType";

interface ModelFactoryConfig<T, I> {
  overrideData?: Partial<T> | Partial<T>[];
  overrideInput?: I | I[];
}

export class ModelFactory<T extends object, I> {
  private config: ModelFactoryConfig<T, I> = {};
  private constructor(
    private readonly Model: Type<T>,
    private readonly overrideInput: (g: T, i: I) => T
  ) {}

  public static init<T extends object, I>(
    model: Type<T>,
    input: (generated: T, input: I) => T
  ): ModelFactory<T, I> {
    return new ModelFactory<T, I>(model, input);
  }

  public create(): T;
  public create(length: number): T[];
  public create(length?: number): T | T[] {
    if (length === undefined) {
      const afterInput = this.enrichModel(this.generateModel());
      return { ...afterInput, ...this.getOverrideForIndex() };
    }

    return Array.from({ length }).map((_, index) => {
      return {
        ...this.enrichModel(this.generateModel(), index),
        ...this.getOverrideForIndex(index),
      };
    });
  }

  public input(spec: I | I[]): ModelFactory<T, I> {
    this.config.overrideInput = spec;

    return this;
  }

  public override(spec: Partial<T> | Partial<T>[]): ModelFactory<T, I> {
    this.config.overrideData = spec;

    return this;
  }

  private getOverrideForIndex(index: number = 0): Partial<T> | undefined {
    return Array.isArray(this.config.overrideData)
      ? this.config.overrideData?.[index]
      : this.config.overrideData;
  }

  private getInputForIndex(index: number = 0): I | undefined {
    return Array.isArray(this.config.overrideInput)
      ? this.config.overrideInput?.[index]
      : this.config.overrideInput;
  }

  private generateModel(): T {
    return generateType(this.Model) as T;
  }

  private enrichModel(model: T, index?: number): T {
    const inputData = this.getInputForIndex(index);
    const afterInput = inputData ? this.overrideInput(model, inputData) : model;

    return afterInput;
  }
}
