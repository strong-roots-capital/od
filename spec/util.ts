export function not<F extends (...args: any[]) => boolean>(f: F): F {
    return function inverted(...args: Parameters<F>) {
        return !f(...args)
    } as F
}

export function includedIn<T>(list: T[]): (value: T) => boolean {
    return function testIsIncludedIn(value) {
        return list.includes(value)
    }
}
