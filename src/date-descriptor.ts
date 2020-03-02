import { has } from './parse'

export type DateDescriptor =
    | { year: number }
    | { year: number; month: number }
    | { year: number; month: number; date: number }
    | { year: number; month: number; date: number; hour: number }
    | { year: number; month: number; date: number; hour: number; minute: number }
    | { year: number; month: number; date: number; hour: number; minute: number; second: number }
    | { year: number; month: number; date: number; hour: number; minute: number; second: number; millisecond: number }

export type DateDescriptorArray = [number, number, number, number, number, number, number];

export function isDateDescriptor(value: unknown): value is DateDescriptor {

    if (typeof value !== 'object' || value === null) {
        return false
    }

    return has('year', value)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function asDateDescriptorArray(
    value: DateDescriptor
): DateDescriptorArray {
    return [
        (value as any).year,
        (value as any).month || 0,
        (value as any).date || 1,
        (value as any).hour || 0,
        (value as any).minute || 0,
        (value as any).second || 0,
        (value as any).millisecond || 0
    ]
}
/* eslint-enable @typescript-eslint/no-explicit-any */

//  LocalWords:  DateDescriptor
