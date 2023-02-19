import { Comparer } from '@reduxjs/toolkit'
import compareAsc from 'date-fns/compareAsc'
import compareDesc from 'date-fns/compareDesc'

type SortDirection = 'asc' | 'desc'

export const dateSorter: (
  key: string,
  direction?: SortDirection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Comparer<any> =
  (key, direction = 'asc') =>
  (a, b) =>
    ({
      asc: compareAsc(new Date(a[key]), new Date(b[key])),
      desc: compareDesc(new Date(a[key]), new Date(b[key])),
    }[direction])
