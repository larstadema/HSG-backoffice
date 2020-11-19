import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

import CustomButton from '../../components/Button/CustomButton'
import CheckOut from '../../components/Dashboard/CheckOut'

import {
  getReservations,
  setMinus,
  setPlus,
  setCheckout,
  getOldReservations,
  getDates,
  removeDay,
  closeThisDay,
} from '../../redux/actions/dataActions'

import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

export const ReservationTabel = (props) => {
  const { reservations} = props

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReservations())
    dispatch(getOldReservations())
  }, [dispatch])

  const groupRes = reservations.reduce((groups, reservation) => {
    const date = reservation.date

    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(reservation)
    return groups
  }, {})

  const groupReservations = Object.keys(groupRes).map((date) => {
    return {
      date,
      reservations: groupRes[date],
    }
  })
  const handleMinus = (dateId, reservationId) => {
    dispatch(setMinus(dateId, reservationId))
  }
  const handlePlus = (dateId, reservationId) => {
    dispatch(setPlus(dateId, reservationId))
  }

  return (
    <div>
      <Grid item sm={12} md={12} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.pageTitle}>
            Reserveringen
          </Typography>
          <Grid container spacing={3}>
            {groupReservations.map((item, index) => (
              <Grid item sm={12} xs={12} key={item.date}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow className={classes.tableHeadActive}>
                        <TableCell
                          className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                          colSpan={4}
                        >
                          {dayjs(item.date).locale(nl).format('dddd D MMMM')}
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
                      {groupReservations[index].reservations.map((row, i) => (
                        <TableRow key={row.reservationId}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                          <TableCell>{row.body}</TableCell>
                          <TableCell align="center">
                            <CustomButton
                              onClick={() => handleMinus(row.dateId, row.reservationId)}
                              tip="min"
                              disabled={row.coins <= 0}
                              color="secondary"
                            >
                              <RemoveIcon />
                            </CustomButton>
                            {row.coins}
                            <CustomButton
                              onClick={() => handlePlus(row.dateId, row.reservationId)}
                              tip="plus"
                              className={classes.plusButton}
                              color="secondary"
                            >
                              <AddIcon />
                            </CustomButton>
                          </TableCell>
                          <TableCell align="center">
                            <CheckOut dateId={row.dateId} reservationId={row.reservationId} />
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

const mapStateToProps = (state) => ({
  reservations: state.data.reservations,
  oldReservations: state.data.oldReservations
})

const mapDispatchToProps = {
  getReservations,
  setPlus,
  setMinus,
  setCheckout,
  getOldReservations,
  getDates,
  closeThisDay,
  removeDay,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationTabel)
