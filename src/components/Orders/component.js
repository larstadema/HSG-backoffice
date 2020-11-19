import React from 'react'

import { Container, Grid, CssBaseline } from '@material-ui/core'

// import { ReservationCard } from '../ReservationCard'
// import { RevenueCard } from '../RevenueCard'
// import { TotalCoinsCard } from '../TotalCoinsCard'

 import { OrdersTable } from './OrdersTable'
// import { AddGuest } from '../AddGuest'
// import BackupList from '../BackupList'

export const OrdersUI = ({ isOpen, classes }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={isOpen ? classes.contentOpen : classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <OrdersTable />
            </Grid>
            <Grid item lg={4} md={12} xl={3} xs={12}>
                <p>Pie chart</p>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default OrdersUI
