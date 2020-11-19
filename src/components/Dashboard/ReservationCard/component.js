import React from 'react'
import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'

import CountUp from 'react-countup'

export const ReservationCard = ({ totalReservations, classes }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Reserveringen
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <CountUp preserveValue={true} end={totalReservations} />
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
export default ReservationCard
