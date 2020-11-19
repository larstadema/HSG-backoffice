import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/'

import { EditProductButton } from './component'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  controls: {
    marginLeft: 'auto',
  },
}))
export const EditProductButtonContianer = (props) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <EditProductButton
      classes={classes}
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      productName={props.productName}
      productDescription={props.productDescription}
      productPrice={props.productPrice}
      visible={props.visible}
      productId={props.productId}
      productImage={props.productImage}
    />
  )
}

export default EditProductButtonContianer
