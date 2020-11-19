import React from 'react'

import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { AddProductForm } from './component'

import { Products } from '../../../redux'

const useStyles = makeStyles((theme)=>({
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

export const AddProductFormContainer = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(Products.Actions.addProduct(values))
      }
    return (
        <AddProductForm classes={classes} handleSubmit={handleSubmit}/>
    )
}
export default AddProductFormContainer