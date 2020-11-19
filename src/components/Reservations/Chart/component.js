import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Line } from 'react-chartjs-2'

const ReservationCard = ({ isLoading, classes, data, options }) => {
  if (isLoading) {
    return (
      <Typography variant="h5" align="center">
        Loading....
      </Typography>
    )
  }
  return (
    <Paper className={classes.chart}>
      <Line data={data} options={options} height={300} />
    </Paper>
  )
}

export default ReservationCard
