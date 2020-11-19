import React from 'react'

import { useSelector } from 'react-redux'
import { Data } from '../../../redux'

import TotalCoinsCard from './component'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

export const TotalCoinsCardContainer = () => {
  const classes = useStyles()
  const reservations = useSelector(Data.Selectors.reservations)
  const totalCoins = reservations.reduce(function (tot, arr) {
    return tot + arr.coins
  }, 0)

  return <TotalCoinsCard totalCoins={totalCoins} classes={classes} />
}
export default TotalCoinsCardContainer
