import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'
import { Data } from '../../../redux'

import ReservationTabs from './component'

import { getTableData, groupBy } from './helpers'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  chart: {
    padding: '10px',
  },
  coins: {
    backgroundColor: '#81c784',
    marginBottom: '20px',
  },
}))

const TabsContainer = () => {
  const oldReservations = useSelector(Data.Selectors.oldReservations)
  const isLoading = useSelector(Data.Selectors.isLoading)

  const [transformedData, setTransformedData] = useState(getTableData(oldReservations))

  const classes = useStyles()

  useEffect(() => {
    if (oldReservations) {
      const tableData = getTableData(oldReservations)
      setTransformedData(tableData)
    }
  }, [oldReservations])

  const grouped = Object.entries(groupBy(oldReservations, 'date'))

  return (
    <ReservationTabs
      isLoading={isLoading}
      classes={classes}
      grouped={grouped}
      dates={transformedData.dates}
      amount={transformedData.amounts}
    />
  )
}

export default TabsContainer
