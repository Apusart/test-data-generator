import { Type } from "../types";
import { ModelFactory } from "./Model.factory";

interface ModelFactoryConfig<T, I> {
  input: (g: T, i: I) => T;
}

type ConditionalModelFactory<T extends object, I> = I extends undefined
  ? Omit<ModelFactory<T, I>, "input">
  : ModelFactory<T, I>;

export class ModelFactoryBuilder<T extends object, I> {
  private readonly config: ModelFactoryConfig<T, I> = {
    input: (a) => a,
  };

  private constructor(private readonly model: Type<T>) {}

  static create<TModel extends object>(
    model: Type<TModel>
  ): ModelFactoryBuilder<TModel, undefined> {
    return new ModelFactoryBuilder<TModel, undefined>(model);
  }

  withInput<TInput>(
    fn: (g: T, i: TInput) => T
  ): ModelFactoryBuilder<T, TInput> {
    this.config.input = fn as any;

    return this as unknown as ModelFactoryBuilder<T, TInput>;
  }

  build(): ConditionalModelFactory<T, I> {
    if (!this.model) {
      throw new Error("Model is required");
    }

    return ModelFactory.init(
      this.model as Type<T>,
      this.config.input
    ) as ConditionalModelFactory<T, I>;
  }
}
