import React from 'react'

import { useSelector } from 'react-redux'
import { Data } from '../../../redux'

import ReservationCard from './component'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

export const ReservationCardContainer = () => {
  const classes = useStyles()
  const reservations = useSelector(Data.Selectors.reservations)
  let totalReservations = reservations.length
  return <ReservationCard totalReservations={totalReservations} classes={classes}/>
}

export default ReservationCardContainer
