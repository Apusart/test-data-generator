# TestDataAnnotations

## Description

TestDataAnnotations is a lightweight npm package designed to simplify the process of generating test data using annotations in TypeScript projects.

## Table of Contents

- [TestDataAnnotations](#testdataannotations)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Test data definition](#test-data-definition)
      - [Overview](#overview)
      - [Example](#example)
    - [Available Annotations](#available-annotations)
    - [Creating factory](#creating-factory)
    - [Using factory](#using-factory)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install TestDataAnnotations, simply run:

```bash
npm install --save-dev test-data-annotations
```

## Usage

Using TestDataAnnotations is straightforward. Simply annotate your class properties with decorators to define rules for generating mock data.

```typescript
import { GenUuid, GenArray, ModelFactoryBuilder, UserFactory } from '@apusart/test-data-annotations';

class User {
  @GenUuid()
  id: string;
}

const UserFactory = ModelFactoryBuilder.create(User).build();
const user: User = UserFactory.create();
```

### Test data definition

#### Overview

The test-data-annotations library provides decorators to facilitate the generation of test data for TypeScript classes. These decorators can be applied to class properties to specify how they should be populated with test data.

#### Example

Consider the following example class:

```typescript
import { GenUuid, GenArray } from '@apusart/test-data-annotations';

class User {
  @GenUuid()
  id: string;

  @GenString()
  name: string;

  @GenNumber({ type: "int", options: { min: 1, max: 80 } })
  age: number;

  @GenArray(5)
  @GenString()
  roles: string[];
}
```

In this example:

- `id` property is annotated with `@GenUuid()`, indicating that it should be populated with UUID.
- `name` property is annotated with `GenString`, which by default is alphanumerical string.
- `age` property is annotated with `@GenNumber()`, specifying the type as int and options to populate this field with integers from the range 1 to 80.
- The `roles` property is annotated with `@GenArray()` and `@GenString()`, indicating that it should be populated with an array of 5 strings.

### Available Annotations

These annotations are strongly based on the type generation capabilities provided by [faker.js](https://fakerjs.dev/).

| Annotation                | Description                                                                                                                                                               | Defaults
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------------------- |
| `@GenArray(length?)` | Generates an array for the annotated property. The `length` parameter specifies the number of elements in the array. It requires annotation declaring the type.    | `1`
| `@GenBoolean()`| Generates a boolean | -
| `@GenEnum(enum)` | Generates value of provided | `any`
| `@GenNumber(options?)`   | Generates a number for the annotated property. Options can specify the type (e.g., `int`, `float`) and define the range of values.                                        | `{ type: "int", options: undefined }`
| `@GenString(options?)`   | Generates a string for the annotated property. By default, it generates an alphanumerical string. Options can customize the generated string, such as length or format. | `{ type: "alphabetical", options: undefined }`
| `@GenType(type)` | Generates instance of a type provided as parameter | `T extends object`
| `@GenUuid()`              | Generates a UUID (Universally Unique Identifier) for the annotated property.                                                                                              | -

**GenProperty Helper Function:**

In cases where the predefined annotations are not sufficient for your needs, the GenProperty helper function can be used. This function allows you to define custom generators for your properties using faker.js methods directly or your custom logic. By utilizing GenProperty, you can generate test data tailored to your specific requirements beyond the scope of the provided annotations. GenProperty helper function can be used like this:

```typescript
function GenYourType() {
  return GenProperty({
    generationFn: () => {
      // Your generation logic here
      return "Your generated value";
    }
  });
}
```

### Creating factory

Factories are a core feature of the test-data-annotations library, enabling the generation of instances for annotated classes with randomized data aligned to specified annotations. By defining a factory for your class, you can effortlessly generate mock instances, ensuring your application behaves as expected across diverse scenarios. Factories streamline the test data generation process, saving time and effort in your development workflow.

To create a type factory, utilize the ModelFactoryBuilder. Instantiate the ModelFactoryBuilder by invoking its create method and specifying the type you wish to randomize. Additionally, the ModelFactoryBuilder offers useful methods:

- **withInput**: This method allows you to manipulate generated value with input from the outside. This function is taking two arguments: the generated random type and any desired input (e.g., string, number, or object). The input function must return the same type provided in the create function. If no input is provided, it won't be accessible later in the factory itself.
  ```typescript
  const TodoFactory = ModelFactoryBuilder.create(Todo)
  .withInput((todo: Todo, user: User) => ({ // allows specifying additional data
    ...todo,
    userId: user.id,
  }))
  .build();
  ```
- **build**: creates factory.


### Using factory

A factory, integral to the test-data-annotations library, serves as a crucial tool for generating instances of annotated classes with randomized data according to specified annotations and configurations set in the builder. Once defined, a factory acts as a blueprint for creating mock instances tailored to your class structure and annotation configurations.

The factory also functions as a builder, allowing you to specify input and override objects before invoking the `create()` function.

**Create Function**
The `create()` function takes only one argument: a number specifying the quantity of instances to generate, defaulting to 1. If you specify more than one instance, you also need to provide the same amount of input and override when used.

```typescript
const user: User = UserFactory.create();
const [user1, user2] = UserFactory.create(2);
```

**Input Function**
The input function allows you to manipulate data with the provided function in the ModelFactoryBuilder. Input becomes particularly useful when properties of the generated type rely on other types not included in `Partial<T>`, as it is in override.

```typescript
const user: User = UserFactory.create();
const todo: Todo = TodoFactory.input(user).create(); // if you don't specify input function this will throw compile error
const [todo1, todo2] = TodoFactory.input([user, user]).create(2); // if you don't specify input function this will throw compile error
```

**Override Function**
The override function replaces the generated type with the provided partial object as an argument.

```typescript
const user: User = UserFactory.create();
const todo: Todo = TodoFactory.override({ userId: user.id }).create();
const [todo1, todo2] = TodoFactory.override([
  { userId: user.id },
  { id: uuid() },
]).create();
```

**IMPORTANT!**
The input function is called before the override function.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

TestDataAnnotations is licensed under the MIT License. See the [LICENSE](https://github.com/Apusart/test-data-generator/blob/main/LICENSE) file for details.

**Tags:** `test-data`, `faker.js`, `type-generation`
