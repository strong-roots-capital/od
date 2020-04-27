/**
 * Reference:
 * https://stackoverflow.com/questions/51859461/generic-curry-function-with-typescript-3/51860718#51860718
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function curry<F extends ((...args: any) => any)>(f: F): Curried<F> {
    return function curried(...args: any[]): any {
        return args.length < f.length
            ? curried.bind(null, ...args)
            : f.call(null, ...args as any)
    }
}

type Length<T extends Array<any>> = T['length'];

type Applies<F extends (...a: any[]) => any, L extends number> = [
    never,
    F extends ((a: infer A, ...z: infer Z) => infer R) ?
        (a: A) => Length<Z> extends 0 ? R : (...z: Z) => R : never,
    F extends ((a: infer A, b: infer B, ...z: infer Z) => infer R) ?
        (a: A, b: B) => Length<Z> extends 0 ? R : (...z: Z) => R : never,
    F extends ((a: infer A, b: infer B, c: infer C, ...z: infer Z) => infer R) ?
        (a: A, b: B, c: C) => Length<Z> extends 0 ? R : (...z: Z) => R : never,
    F extends ((a: infer A, b: infer B, c: infer C, d: infer D, ...z: infer Z) => infer R) ?
        (a: A, b: B, c: C, d: D) => Length<Z> extends 0 ? R : (...z: Z) => R : never,
    F extends ((a: infer A, b: infer B, c: infer C, d: infer D, e: infer E,...z: infer Z) => infer R) ?
        (a: A, b: B, c: C, d: D, e: E) => Length<Z> extends 0 ? R : (...z: Z) => R : never
][L];

export type Curried<F extends ((...args: any[]) => any)> =
    <L extends Parameters<Applies<F, number>>>(...args: L) =>
    ReturnType<Applies<F, Length<L>>> extends Function
    ? Curried<ReturnType<Applies<F, Length<L>>>>
    : ReturnType<F>;
