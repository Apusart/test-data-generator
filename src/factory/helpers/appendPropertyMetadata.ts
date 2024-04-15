export function appendPropertyMetadata(
  target: any,
  propertyKey: string | symbol,
  options: any
): void {
  Reflect.defineMetadata(
    propertyKey,
    {
      ...Reflect.getMetadata(propertyKey, target),
      ...options,
    },
    target
  );
}
