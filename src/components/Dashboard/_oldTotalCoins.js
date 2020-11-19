import React from 'react'
import { connect } from 'react-redux'

import { Avatar, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core'
import Balance from '@material-ui/icons/AccountBalanceWallet'
import CountUp from 'react-countup'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    height: '100%',
  },
}))

export const TotalCoins = (props) => {
  const classes = useStyles()
  const { reservations } = props

  const result = reservations.reduce(function (tot, arr) {
    return tot + arr.coins
  }, 0)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Totaal Munten
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <CountUp end={result} preserveValue={true} />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Balance className={classes.differenceIcon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  reservations: state.data.reservations,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TotalCoins)
