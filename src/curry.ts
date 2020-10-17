/**
 * Implementation sourced from @typed/curry:
 * https://github.com/TylorS/typed-curry
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* A function which takes exactly 1 parameter */
export type Arity1<A, B> = (a: A) => B;

/* A function which takes exactly 2 parameters */
export type Arity2<A, B, C> = (a: A, b: B) => C;

/* A function which takes exactly 3 parameters */
export type Arity3<A, B, C, D> = (a: A, b: B, c: C) => D;

/* A curried function of 0 to 1 parameters accepted */
export interface Curry1<A, B> {
    (): Curry1<A, B>;
    (a: A): B;
}

/* A curried function of 0 to 2 parameters accepted */
export interface Curry2<A, B, C> {
    (): Curry2<A, B, C>;
    (a: A): Curry1<B, C>;
    (a: A, b: B): C;
}

/* A curried function of 0 to 3 parameters accepted */
export interface Curry3<A, B, C, D> {
    (): Curry3<A, B, C, D>;
    (a: A): Curry2<B, C, D>;
    (a: A, b: B): Curry1<C, D>;
    (a: A, b: B, c: C): D;
}

function curry1<A, B>(fn: Arity1<A, B>): Curry1<A, B>;
function curry1(fn: Arity1<any, any>): Curry1<any, any>;
function curry1<A, B>(fn: Arity1<A, B>): Curry1<A, B> {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function curried (a: A) {
        switch (arguments.length) {
            case 0: return curried;
            default: return fn(a);
        }
    }
    return curried as Curry1<A, B>;
}

function curry2<A, B, C>(fern: Arity2<A, B, C>): Curry2<A, B, C>;
function curry2(fn: Arity2<any, any, any>): Curry2<any, any, any>;
function curry2<A, B, C>(fn: Arity2<A, B, C>): Curry2<A, B, C> {
    function curried (a: A, b: B): any {
        switch (arguments.length) {
            case 0: return curried;
            case 1: return curry1<B, C>((b: B) => fn(a, b));
            default: return fn(a, b);
        }
    }
    return curried as Curry2<A, B, C>;
}

function curry3<A, B, C, D>(fn: Arity3<A, B, C, D>): Curry3<A, B, C, D>;
function curry3(fn: Arity3<any, any, any, any>): Curry3<any, any, any, any>;
function curry3<A, B, C, D>(fn: Arity3<A, B, C, D>): Curry3<A, B, C, D> {
    function curried (a: A, b: B, c: C): any {
        switch (arguments.length) {
            case 0: return curried;
            case 1: return curry2<B, C, D>((b: B, c: C) => fn(a, b, c));
            case 2: return curry1<C, D>((c: C) => fn(a, b, c));
            default: return fn(a, b, c);
        }
    }
    return curried as Curry3<A, B, C, D>;
}

export function curry<A, B>(fn: Arity1<A, B>): Curry1<A, B>;
export function curry( fn: Arity1<any, any> ): Curry1<any, any>;

export function curry<A, B, C>(fn: Arity2<A, B, C>): Curry2<A, B, C>;
export function curry(fn: Arity2<any, any, any>): Curry2<any, any, any>;

export function curry<A, B, C, D>(fn: Arity3<A, B, C, D>): Curry3<A, B, C, D>;
export function curry(fn: Arity3<any, any, any, any>): Curry3<any, any, any, any>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/ban-types
export function curry(fn: Function) {
    switch (fn.length) {
        case 0: return fn;
        case 1: return curry1(fn as Arity1<any, any>);
        case 2: return curry2(fn as Arity2<any, any, any>);
        case 3: return curry3(fn as Arity3<any, any, any, any>);
        default: throw new Error('This `curry` implementation does not support more than 3 arguments');
    }
}
