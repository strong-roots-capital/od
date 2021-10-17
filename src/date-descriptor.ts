import { has } from './parse'

export type DateDescriptor =
  | { year: number }
  | { year: number; month: number }
  | { year: number; month: number; date: number }
  | { year: number; month: number; date: number; hour: number }
  | { year: number; month: number; date: number; hour: number; minute: number }
  | {
      year: number
      month: number
      date: number
      hour: number
      minute: number
      second: number
    }
  | {
      year: number
      month: number
      date: number
      hour: number
      minute: number
      second: number
      millisecond: number
    }

type CompleteDateDescriptor = {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
  millisecond: number
}

export type DateDescriptorArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

export function isDateDescriptor(value: unknown): value is DateDescriptor {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return has('year', value)
}

function completeDateDescriptor(value: DateDescriptor): CompleteDateDescriptor {
  return {
    year: value.year,
    month: (value as CompleteDateDescriptor).month || 0,
    date: (value as CompleteDateDescriptor).date || 1,
    hour: (value as CompleteDateDescriptor).hour || 0,
    minute: (value as CompleteDateDescriptor).minute || 0,
    second: (value as CompleteDateDescriptor).second || 0,
    millisecond: (value as CompleteDateDescriptor).millisecond || 0,
  }
}

function dateDescriptorArray(value: DateDescriptor): DateDescriptorArray {
  const date = completeDateDescriptor(value)
  return [
    date.year,
    date.month,
    date.date,
    date.hour,
    date.minute,
    date.second,
    date.millisecond,
  ]
}

function dateStringAsDateDescriptor(datestring: string): DateDescriptor {
  const isoRegex =
    /^([-+]?(?:\d{2})?\d{4})-(\d{2})-(\d{2})T?(\d{2})?:?(\d{2})?:?(\d{2})?.?(\d{3})?Z?$/
  const matches = datestring.match(isoRegex)
  if (matches === null) {
    throw new Error(`Expected date-string to be in ISO time, got '${datestring}'`)
  }
  return {
    year: Number.parseInt(matches[1]),
    month: Number.parseInt(matches[2]) - 1,
    date: Number.parseInt(matches[3]),
    hour: Number.parseInt(matches[4]),
    minute: Number.parseInt(matches[5]),
    second: Number.parseInt(matches[6]),
    millisecond: Number.parseInt(matches[7]),
  }
}

export function dateDescriptorAsDate(descriptor: DateDescriptor): Date {
  const date = new Date(Date.UTC(...dateDescriptorArray(descriptor)))
  date.setUTCFullYear(descriptor.year)
  return date
}

export function dateStringAsDate(datestring: string): Date {
  return dateDescriptorAsDate(dateStringAsDateDescriptor(datestring))
}

//  LocalWords:  DateDescriptor
