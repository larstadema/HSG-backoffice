import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'
import { Data } from '../../../redux'

import ReservationChart from './component'

import { getChartData } from './helpers'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  chart: {
    padding: '10px',
  },
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const ChartContainer = () => {
  const oldReservations = useSelector(Data.Selectors.oldReservations)
  const isLoading = useSelector(Data.Selectors.isLoading)
  const [transformedData, setTransformedData] = useState(getChartData(oldReservations))

  const classes = useStyles()

  useEffect(() => {
    if (oldReservations) {
      const chartData = getChartData(oldReservations)
      setTransformedData(chartData)
    }
  }, [oldReservations])

  const data = {
    labels: transformedData.dates,
    datasets: [
      {
        type: 'line',
        label: 'Munten',
        data: transformedData.amounts,
        fill: true,
        backgroundColor: 'rgba(129, 199, 132, 0.4)',
        borderColor: 'rgba(129, 199, 132, 1)',
      },
      {
        type: 'line',
        label: 'Reserveringen',
        backgroundColor: 'rgba(138, 133, 255, 0.4)',
        data: transformedData.people,
        borderColor: 'rgba(138, 133, 255, 1)',
        borderWidth: 2,
      },
    ],
  }

  return <ReservationChart isLoading={isLoading} classes={classes} data={data} options={options} />
}
export default ChartContainer
