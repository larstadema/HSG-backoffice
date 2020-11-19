import React from 'react'

import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { EditProductForm } from './component'

import { Products } from '../../../redux'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 5,
  },
}))

export const EditProductFormContainer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleSubmit = (values) => {
    dispatch(Products.Actions.editProduct(values))
  }
  return (
    <EditProductForm
      classes={classes}
      handleSubmit={handleSubmit}
      productName={props.productName}
      productDescription={props.productDescription}
      productPrice={props.productPrice}
      visible={props.visible}
      productId={props.productId}
      productImage={props.productImage}
    />
  )
}
export default EditProductFormContainer
