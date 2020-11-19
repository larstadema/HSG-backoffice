import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Box from '@material-ui/core/Box'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'
import clsx from 'clsx'

import { Avatar, Card, CardContent, Typography } from '@material-ui/core'
import Balance from '@material-ui/icons/AccountBalanceWallet'
import CountUp from 'react-countup'
import EuroIcon from '@material-ui/icons/Euro'
import Paper from '@material-ui/core/Paper'
import { Line } from 'react-chartjs-2'

import { getReservations, getOldReservations } from '../../redux/actions/dataActions'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
  },
  coins: {
    backgroundColor: '#81c784',
    marginBottom: '20px',
  },
  tabs:{
    marginTop: '25px'
  },
  chart:{
    padding: '10px'
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export const ReservationTabs = (props) => {
  const { oldReservations } = props
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [transformedData, setTransformedData] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    setTransformedData(transformData(groupBy(oldReservations, 'date')))
  }, [oldReservations])

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  const getDates = () => transformedData.map((pair) => pair.date)
  const getAmounts = () => transformedData.map((pair) => pair.amount)
  const getPeeps = () => transformedData.map((pair) => pair.people)
  const transformData = (groupedData) => {
    const transformedArray = []
    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.coins, 0)
      const peeps = entry[1].length
      transformedArray.push({ date: dayjs(entry[0]).locale(nl).format('DD-MM-YYYY'), amount: total, people: peeps })
    })

    const sortedArray = transformedArray.sort((a, b) => dayjs(a['date']).locale(nl).format('DD MM YYYY') - dayjs(b['date']).locale(nl).format('DD MM YYYY'))

    return sortedArray
  }
  console.log('DEBUG 🔥', oldReservations)
  console.log('The Dates ⏲️', getDates())
  console.log('The Amounts ⏲️', getAmounts())
  console.log('The GROUPED values are ⏲️', Object.entries(groupBy(oldReservations, 'date')))
  console.log('The Total grouped value 👽', transformData(groupBy(oldReservations, 'date')))

  const groupRes = oldReservations.reduce((groups, reservation) => {
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
  const result = oldReservations.reduce(function (tot, arr) {
    return tot + arr.coins
  }, 0)


  return (
    <div className={classes.root}>
      
      <Paper>
      <AppBar position="static" className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Reservation Tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {groupReservations.map((item, index) => (
            <Tab key={index} label={dayjs(item.date).locale(nl).format('dddd D MMMM')} />
          ))}
        </Tabs>
      </AppBar>
      {groupReservations.map((item, i) => (
        <TabPanel value={value} index={i} key={i}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Card className={classes.coins}>
                <CardContent>
                  <Grid container justify="space-between" spacing={3}>
                    <Grid item>
                      <Typography color="textSecondary" gutterBottom variant="h6">
                        Totaal Munten
                      </Typography>
                      <Typography color="textPrimary" variant="h4">
                        <CountUp
                          end={transformedData.length === 0 ? 0 : getAmounts()[i]}
                          preserveValue={true}
                        />
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
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card className={clsx(classes.coins)}>
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
                        <CountUp
                          decimals={2}
                          decimal=","
                          prefix="€"
                          end={transformedData.length === 0 ? 0 : getAmounts()[i] * 1.7}
                          preserveValue={true}
                        />
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
            </Grid>
          </Grid>

          <Grid item sm={12} xs={12} key={item.date}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.tableHeadActive}>
                    <TableCell
                      className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                      colSpan={4}
                    >
                      {' '}
                      {dayjs(item.date).locale(nl).format('dddd D MMMM')}
                    </TableCell>
                    <TableCell
                      className={`${classes.capitalize} ${classes.tableCellHeadColored}`}
                      colSpan={1}
                      align="center"
                    ></TableCell>
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
                  {groupReservations[i].reservations.map((row, index) => (
                    <TableRow key={row.firstName}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                      <TableCell>{row.body}</TableCell>
                      <TableCell align="center">{row.coins}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </TabPanel>
      ))}
      </Paper>
      
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const mapStateToProps = (state) => ({
  reservations: state.data.reservations,
  oldReservations: state.data.oldReservations,
})

const mapDispatchToProps = {
  getReservations,
  getOldReservations,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationTabs)
