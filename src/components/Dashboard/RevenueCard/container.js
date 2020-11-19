import React from 'react'

import { useSelector } from 'react-redux'
import { Data } from '../../../redux'

import RevenueCard from './component'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

export const RevenueCardContainer = () => {
  const classes = useStyles()
  const reservations = useSelector(Data.Selectors.reservations)

  const coins = reservations.reduce(function (tot, reservation) {
    return tot + reservation.coins
  }, 0)
  let totalCoins = coins * 1.7

  return <RevenueCard totalCoins={totalCoins} classes={classes} />
}

export default RevenueCardContainer
