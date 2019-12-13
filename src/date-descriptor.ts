import { NonEmptyListOfNonEmptyList } from './non-empty-list'

export type DateDescriptor =
    | { year: number }
    | { year: number; month: number }
    | { year: number; month: number; date: number }
    | { year: number; month: number; date: number; hour: number }
    | { year: number; month: number; date: number; hour: number; minute: number }
    | { year: number; month: number; date: number; hour: number; minute: number; second: number }
    | { year: number; month: number; date: number; hour: number; minute: number; second: number; millisecond: number }

export type DateDescriptorArray = NonEmptyListOfNonEmptyList<number>


export function isDateDescriptor(value: unknown): value is DateDescriptor {

    if (typeof value !== 'object' || value === null) {
        return false
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return 'year' in value && (value as any)['year'] !== undefined
}

export function asDateDescriptorArray(
    value: DateDescriptor
): NonEmptyListOfNonEmptyList<number> {
    return [
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (value as any).year,
        (value as any).month,
        (value as any).date || 1,
        (value as any).hour,
        (value as any).minute,
        (value as any).second,
        (value as any).millisecond
        /* eslint-enable @typescript-eslint/no-explicit-any */
    ].map(prop => prop === undefined ? 0 : prop) as NonEmptyListOfNonEmptyList<number>
}

//  LocalWords:  DateDescriptor
