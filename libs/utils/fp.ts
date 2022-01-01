export const select = <R, K extends string>(key: K) => <T extends Record<K, any>>(data: T) => data[key];
export const sum = (a: number, b: number) => a + b;
export const map = <T, R = any>(fn: (e: T, i: number, arr: T[]) => R) => (arr: T[]) => arr.map(fn);
export const filter = <T, R = any>(fn: (e: T, i: number, arr: T[]) => R) => (arr: T[]) => arr.filter(fn);
export const reduce = <T, R>(fn: (r: R, e: T) => R) => (init: R) => (arr: T[]) => arr.reduce(fn, init);