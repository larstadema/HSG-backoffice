import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'

import { Orders } from '../../../redux'

import OrdersTable from './component'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))

const OrdersTableContainer = () => {
  const orders = useSelector(Orders.Selectors.orders)
  const isLoading = useSelector(Orders.Selectors.isLoading)

  const classes = useStyles()
  return <OrdersTable isLoading={isLoading} classes={classes} orders={orders} />
}

export default OrdersTableContainer
