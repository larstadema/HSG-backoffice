import React from 'react'

import { Container, Grid, CssBaseline } from '@material-ui/core'

import { ReservationChart } from '../Reservations/Chart'
import { ReservationsTabs } from '../Reservations/Tabs'

export const ReservationsUI = ({ isOpen, classes }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={isOpen ? classes.contentOpen : classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ReservationChart />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ReservationsTabs />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
export default ReservationsUI