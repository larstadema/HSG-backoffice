import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { Avatar, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core'
import EuroIcon from '@material-ui/icons/Euro'
import CountUp from 'react-countup'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    height: '100%',
  },
}))

export const TotalCash = (props) => {
  const classes = useStyles()
  const { reservations} = props

  const result = reservations.reduce(function (tot, arr) {
    return tot + arr.coins
  }, 0)

  let total = result * 1.7

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Omzet{' '}
              <Typography color="textSecondary" variant="caption">
                Ongeveer
              </Typography>
            </Typography>

            <Typography color="textPrimary" variant="h4">
              <CountUp decimals={2} decimal="," prefix="€" end={total} preserveValue={true} />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EuroIcon className={classes.differenceIcon} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TotalCash)
