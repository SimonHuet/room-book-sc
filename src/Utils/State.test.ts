import { dateSorter } from './State'

describe('data sorter use case', () => {
  const array = [
    {
      date: new Date('2020-06-19T17:00:00.000Z'),
    },
    {
      date: new Date('2023-02-02T10:00:00.000Z'),
    },
    {
      date: new Date('2021-11-02T14:00:00.000Z'),
    },
  ]

  test('should correctly sort by default in ASC', () => {
    const expectedArray = [
      {
        date: new Date('2020-06-19T17:00:00.000Z'),
      },
      {
        date: new Date('2021-11-02T14:00:00.000Z'),
      },
      {
        date: new Date('2023-02-02T10:00:00.000Z'),
      },
    ]

    const sortedArray = array.sort(dateSorter('date'))

    expect(sortedArray).toEqual(expectedArray)
  })

  test('should correctly sort in asc', () => {
    const expectedArray = [
      {
        date: new Date('2020-06-19T17:00:00.000Z'),
      },
      {
        date: new Date('2021-11-02T14:00:00.000Z'),
      },
      {
        date: new Date('2023-02-02T10:00:00.000Z'),
      },
    ]

    const sortedArray = array.sort(dateSorter('date'))

    expect(sortedArray).toEqual(expectedArray)
  })

  test('should correctly sort in desc', () => {
    const expectedArray = [
      {
        date: new Date('2023-02-02T10:00:00.000Z'),
      },
      {
        date: new Date('2021-11-02T14:00:00.000Z'),
      },
      {
        date: new Date('2020-06-19T17:00:00.000Z'),
      },
    ]

    const sortedArray = array.sort(dateSorter('date', 'desc'))

    expect(sortedArray).toEqual(expectedArray)
  })
})
