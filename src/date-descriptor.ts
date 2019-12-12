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

    function propertyDefinedIn<T extends object>(
        value: T
    ): (prop: string) => boolean {

        return function propertyDefinedInObject(prop: string): boolean {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return prop in value && (value as any)[prop] !== undefined
        }
    }

    if (typeof value !== 'object' || value === null) {
        return false
    }

    const valueDefined = propertyDefinedIn(value)

    /**
     * Original test can be watered-down with logical refactoring
     */
    // return valueDefined('year') && valueDefined('month') && valueDefined('date') && valueDefined('hour') && valueDefined('minute') && valueDefined('second') && valueDefined('millisecond')
    //     || valueDefined('year') && valueDefined('month') && valueDefined('date') && valueDefined('hour') && valueDefined('minute') && valueDefined('second')
    //     || valueDefined('year') && valueDefined('month') && valueDefined('date') && valueDefined('hour') && valueDefined('minute')
    //     || valueDefined('year') && valueDefined('month') && valueDefined('date') && valueDefined('hour')
    //     || valueDefined('year') && valueDefined('month') && valueDefined('date')
    //     || valueDefined('year') && valueDefined('month')
    //     || valueDefined('year')
    return valueDefined('year')
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
