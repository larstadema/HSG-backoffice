import React, { useState, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core'

import CheckOutButton from './component'

import { Data } from '../../../../redux'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: '1rem',
  },
}))
export const CheckOutButtonContainer = ({ dateId, reservationId }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleCheckOut = useCallback(() => {
    dispatch(Data.Actions.setCheckout(dateId, reservationId))
    setOpen(false)
  }, [dateId, dispatch, reservationId])
  return (
    <CheckOutButton
      classes={classes}
      open={open}
      handleCheckOut={handleCheckOut}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  )
}

export default CheckOutButtonContainer
