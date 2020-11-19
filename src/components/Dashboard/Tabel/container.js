import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getReservations } from '../../../redux/actions/dataActions'

import { useSelector, useDispatch} from 'react-redux'
import { Data } from '../../../redux'

import ReservationTabel from './component'
import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

export const ReservationTabelContainer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const reservations = useSelector(Data.Selectors.reservations)
  const isLoading = useSelector(Data.Selectors.isLoading)
  const [transformedData, setTransformedData] = useState([])
  

  useEffect(() => {
    dispatch(getReservations())
  }, [dispatch])

  
  useEffect(() => {
    setTransformedData(transformData(groupBy(reservations, 'date')))
  }, [reservations])

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})

  const getDates = () => transformedData.map((pair) => pair.date)
  const getAmounts = () => transformedData.map((pair) => pair.amount)

  const grouped = Object.entries(groupBy(reservations, 'date'))

  const transformData = (groupedData) => {
    const transformedArray = []
    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.coins, 0)
      const peeps = entry[1].length
      transformedArray.push({
        date: dayjs(entry[0]).locale(nl).format('dddd D MMMM'),
        amount: total,
        people: peeps,
      })
    })

    const sortedArray = transformedArray.sort(
      (a, b) =>
        dayjs(a['date']).locale(nl).format('dddd D MMMM') -
        dayjs(b['date']).locale(nl).format('dddd D MMMM')
    )

    return sortedArray
  }
  return (
    <ReservationTabel
      isLoading={isLoading}
      classes={classes}
      grouped={grouped}
      dates={getDates()}
      amount={getAmounts()}
    />
  )
}

export default ReservationTabelContainer
