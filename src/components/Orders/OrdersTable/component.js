import React from 'react'

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid
} from '@material-ui/core'

// import dayjs from 'dayjs'
// import nl from 'dayjs/locale/nl'

const OrdersTable = ({ isLoading, classes, orders }) => {
  if (isLoading) {
    return (
      <Typography variant="h5" align="center">
        Loading....
      </Typography>
    )
  }
  return (
    <div className={classes.root}>
      <Paper>
        <Grid item sm={12} xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.tableHeadActive}>
                  <TableCell
                    className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                    colSpan={6}
                  >
                    {' '}
                    Orders
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.tableCellHead}>
                    #
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCellHead}>
                    Naam
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCellHead}>
                    Email
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    className={classes.tableCellHead}
                  >
                    Telefoonnummer
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    className={classes.tableCellHead}
                  >
                    Producten
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    className={classes.tableCellHead}
                  >
                    Totaal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item, i) => (
                  <TableRow key={item.orderId}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell align="center">{item.phonenumber}</TableCell>
                    <TableCell align="left">
                      {item.cartItems.map((product, i) => (
                        <Typography variant="caption" display="block" gutterBottom key={product.productId}>
                          {product.count} x {product.productName}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      €{item.cartItems.reduce((a, c) => a + c.productPrice * c.count, 0)},-
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </div>
  )
}

export default OrdersTable
