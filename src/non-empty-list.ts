export type NonEmptyList<T> = [T, ...T[]]
export type NonEmptyListOfNonEmptyList<T> = [T, T, ...T[]]

export function shift<T>(list: NonEmptyListOfNonEmptyList<T>): [T, NonEmptyList<T>];
export function shift<T>(list: NonEmptyList<T>): [T, T[]];
export function shift<T>(
    list: NonEmptyList<T> | NonEmptyListOfNonEmptyList<T>
): [T, T[] | NonEmptyList<T>] {

    const value = list.shift()
    if (value === undefined) {
        throw new Error(`Expected list to be of type NonEmptyList`)
    }
    return [value, list]
}

//  LocalWords:  NonEmptyList
