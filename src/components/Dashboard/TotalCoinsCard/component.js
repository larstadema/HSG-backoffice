import React from 'react'

import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import Balance from '@material-ui/icons/AccountBalanceWallet'

import CountUp from 'react-countup'

export const TotalCoinsCard = ({ totalCoins, classes }) => {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Totaal Munten
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <CountUp end={totalCoins} preserveValue={true} />
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
export default TotalCoinsCard
