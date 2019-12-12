/**
 * Many thanks to
 * https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Cast<X, Y> = X extends Y ? X : Y;

type Prepend<E, T extends any[]> =
    ((head: E, ...args: T) => any) extends ((...args: infer U) => any)
    ? U
    : T

type Length<T extends any[]> =
    T['length'];

type Tail<T extends any[]> =
    ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
    ? TT
    : [];

type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[
    Length<I> extends N
    ? 1
    : 0
];

export type Curry<F extends ((...args: any) => any)> =
    <T extends any[]>(...args: T) =>
    Length<Drop<Length<T>, Parameters<F>> extends infer DT ? Cast<DT, any[]> : never> extends 0
    ? ReturnType<F>
    : Curry<(...args: Drop<Length<T>, Parameters<F>> extends infer DT ? Cast<DT, any[]> : never) => ReturnType<F>>;


export function curry<F extends (...args: any) => any>(f: F): Curry<F> {

    return function curried(...args): any {
        return args.length < f.length
            ? curried.bind(null, ...args)
            : f.call(null, ...args)
    }
}
