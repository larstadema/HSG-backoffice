import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/'

import { AddProductButton } from './component'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}))
export const AddProductButtonContianer = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <AddProductButton
      classes={classes}
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
    />
  )
}

export default AddProductButtonContianer
