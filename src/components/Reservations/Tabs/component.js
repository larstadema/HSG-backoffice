import React, { useState } from 'react'

import {
  Paper,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Avatar,
  Card,
  CardContent,
  Box,
} from '@material-ui/core'

import { AccountBalanceWallet, Euro } from '@material-ui/icons'

import clsx from 'clsx'
import CountUp from 'react-countup'
import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

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
const ReservationTabs = ({ isLoading, classes, dates, amount, grouped }) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
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
        <AppBar position="static" className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Reservation Tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {dates.map((item, index) => (
              <Tab key={index} label={item} />
            ))}
          </Tabs>
        </AppBar>
        {grouped.map((item, i) => (
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
                          <CountUp end={amount.length === 0 ? 0 : amount[i]} preserveValue={true} />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar>
                          <AccountBalanceWallet className={classes.differenceIcon} />
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
                            end={amount.length === 0 ? 0 : amount[i] * 1.7}
                            preserveValue={true}
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar >
                          <Euro className={classes.differenceIcon} />
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
                        {dayjs(item[i]).locale(nl).format('dddd D MMMM')}
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
                    {grouped[i][1].map((row, index) => (
                      <TableRow key={index + 1}>
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

export default ReservationTabs
