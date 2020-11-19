import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

// TODO: export to global utils
export const groupBy = (array, key) =>
  array.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})


export const transformData = (groupedData) => {
  const transformedArray = []
  Object.entries(groupedData).forEach((entry) => {
    const total = entry[1].reduce((total, pair) => total + pair.coins, 0)
    transformedArray.push({
      date: dayjs(entry[0]).locale(nl).format('dddd D MMMM'),
      amount: total,
    })
  })

  const sortedArray = transformedArray.sort(
    (a, b) =>
      dayjs(a['date']).locale(nl).format('DD MM YYYY') -
      dayjs(b['date']).locale(nl).format('DD MM YYYY')
  )

  return sortedArray
}

export const getTableData = (reservations) => {
if (!reservations.length) {
  return {
    dates: [],
    amounts: [],
  }
}

const data = transformData(groupBy(reservations, 'date'))

return {
  dates: data.map((pair) => pair.date),
  amounts: data.map((pair) => pair.amount),
}
}
