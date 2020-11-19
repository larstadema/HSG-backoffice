import React from 'react'

import { Container, Grid, CssBaseline } from '@material-ui/core'

import { ReservationCard } from '../ReservationCard'
import { RevenueCard } from '../RevenueCard'
import { TotalCoinsCard } from '../TotalCoinsCard'

import { ReservationTabel } from '../Tabel'
import { AddGuest } from '../AddGuest'
import BackupList from '../BackupList'

export const DashBoardUI = ({ isOpen, classes }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={isOpen ? classes.contentOpen : classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <ReservationCard />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <TotalCoinsCard />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <RevenueCard />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <ReservationTabel />
            </Grid>
            <Grid item lg={4} md={12} xl={3} xs={12}>
              <AddGuest />
              <BackupList />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default DashBoardUI
