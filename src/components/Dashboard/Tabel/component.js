import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Typography,
} from '@material-ui/core'

import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

import { PlusButton } from './PlusButton'
import { MinusButton } from './MinusButton'
import { CheckOutButton } from './CheckOutButton'
const ReservationTabel = ({ isLoading, classes, grouped }) => {
  return (
    <div>
      <Grid item sm={12} md={12} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.pageTitle}>
            Reserveringen
          </Typography>

          <Grid container spacing={3}>
            {grouped.length <= 0 && (
              <Typography variant="h5" className={classes.pageTitle}>
                Geen reserveringen op dit moment{' '}
                <span role="img" aria-label="Slightly Frowning Face">
                  🙁
                </span>
              </Typography>
            )}
            {grouped.map((item, i) => (
              <Grid item sm={12} xs={12} key={i}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow className={classes.tableHeadActive}>
                        <TableCell
                          className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                          colSpan={4}
                        >
                          {dayjs(item[i]).locale(nl).format('dddd D MMMM')}
                        </TableCell>
                        <TableCell
                          className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                          colSpan={1}
                          align="center"
                        >
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
                          Opmerking
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.tableCellHead}
                        >
                          Munten
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.tableCellHead}
                        >
                          Uitchecken
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grouped[i][1].map((row, index) => (
                        <TableRow key={row.reservationId}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                          <TableCell>{row.body}</TableCell>
                          <TableCell align="center">
                            <MinusButton
                              dateId={row.dateId}
                              reservationId={row.reservationId}
                              disabled={row.coins <= 0}
                            />
                            {row.coins}
                            <PlusButton dateId={row.dateId} reservationId={row.reservationId} />
                          </TableCell>
                          <TableCell align="center">
                            <CheckOutButton dateId={row.dateId} reservationId={row.reservationId} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default ReservationTabel
