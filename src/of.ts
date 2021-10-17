import {
  dateDescriptorAsDate,
  dateStringAsDate,
  DateDescriptor,
  isDateDescriptor,
} from './date-descriptor'

export function isDatestringInFormatISO(datestring: string): boolean {
  return /^[-+]?(?:\d{2})?\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(datestring)
}

export function isDatestringInFormatISOWithoutMilliseconds(
  datestring: string,
): boolean {
  return /^[-+]?(?:\d{2})?\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(datestring)
}

export function isDatestringInFormatISOWithoutTime(datestring: string): boolean {
  return /^[-+]?(?:\d{2})?\d{4}-\d{2}-\d{2}$/.test(datestring)
}

export function of(millisecondsSinceEpoch: number): Date
export function of(datestring: string): Date
export function of(descriptor: Readonly<DateDescriptor>): Date
export function of(value: number | string | Readonly<DateDescriptor>): Date {
  if (typeof value === 'number') {
    return new Date(value)
  }

  if (typeof value === 'string') {
    switch (true) {
      case isDatestringInFormatISO(value):
      case isDatestringInFormatISOWithoutMilliseconds(value):
      case isDatestringInFormatISOWithoutTime(value):
        return dateStringAsDate(value)
      default:
        throw new Error(`Expected date-string to be in ISO time, got '${value}'`)
    }
  }

  if (isDateDescriptor(value)) {
    return dateDescriptorAsDate(value)
  }

  throw new Error(
    `Expected argument to be of type number or string or DateDescriptor, got '${value}'`,
  )
}

//  LocalWords:  DateDescriptor
