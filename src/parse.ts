export function parseNumber(value: unknown): number {
    if (typeof value === 'number') {
        return value
    }
    throw new Error(`Expected argument to be of type number`)
}

export function parseDate(value: unknown): Date {
    if (
        Object.prototype.toString.call(value) === '[object Date]'
            && (value as Date).getTime !== undefined
            && !Number.isNaN((value as Date).getTime())
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return value as unknown as Date
    }
    throw new Error(`Expected argument to be of type Date`)
}
