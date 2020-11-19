import React from 'react'

import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import EuroIcon from '@material-ui/icons/Euro'
import CountUp from 'react-countup'

export const RevenueCard = ({ totalCoins, classes }) => {
  return (
    <Card>
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
              <CountUp decimals={2} decimal="," prefix="€" end={totalCoins} preserveValue={true} />
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

export default RevenueCard
