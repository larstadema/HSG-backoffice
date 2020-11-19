import React, { useEffect, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { UI, Orders } from '../../redux'

import { OrdersUI } from './component'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
    },
    paddingLeft: theme.spacing(2),
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavinggScreen,
    }),
  },
  contentOpen: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 256,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))
export const OrdersUIContainer = () => {
  const classes = useStyles()
  const isopen = useSelector(UI.Selectors.isOpen)
 const dispatch = useDispatch()

 useEffect(() => {
     dispatch(Orders.Actions.getAllOrders())
 }, [dispatch])

  const isOpen = useMemo(() => {
    return isopen
  }, [isopen])
  return <OrdersUI isOpen={isOpen} classes={classes} />
}

export default OrdersUIContainer
