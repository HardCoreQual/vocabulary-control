export const compose = <T, V>(...args: readonly [
  (x: T) => any,          // 1. The first function type
  ...any[],               // 2. The middle function types
  (x: any) => V           // 3. The last function type
]): (x: V) => T =>          // The compose return type, aka the composed function signature
{
  return (input: V) => args.reduceRight((val, fn) => fn(val), input);
};

// TODO: need type checking what second fn, pass args with type how return from first fn
export const pipe = <T, V>(...args: readonly [
  (x: T) => any,          // 1. The first function type
  ...any[],               // 2. The middle function types
  (x: any) => V           // 3. The last function type
]): (x: T) => V =>          // The pipe return type, aka the composed function signature
{
  return (input: T) => args.reduce((val, fn) => fn(val), input);
};