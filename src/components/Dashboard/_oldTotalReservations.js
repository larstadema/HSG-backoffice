import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { Avatar, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'

import CountUp from 'react-countup'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    height: '100%',
  },
}))

export const TotalReservations = (props) => {
  const classes = useStyles()
  const { reservations } = props
  let total = reservations.length
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Reserveringen
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <CountUp preserveValue={true} end={total} />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.differenceIcon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  reservations: state.data.reservations,
  oldReservations: state.data.oldReservations
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TotalReservations)
