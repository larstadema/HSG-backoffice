import React, {useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Products, UI } from '../../../redux'
import { makeStyles } from '@material-ui/core/'

import { ProductCard } from './component'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root:{
    height: '100%'
  },
  media: {
    paddingTop: '90.25%',
    height: 0,
    width: '100%',
    objectFit: 'cover',
  },
  chipInvisible: {
    backgroundColor: '#f44336',
    color: '#fff'
  },
  chipVisible:{
    color: '#fff'
  },
 
}))

export const ProductCardContainer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const products = useSelector(Products.Selectors.products)
  const isLoading = useSelector(UI.Selectors.isLoading)
  useEffect(() => {
    dispatch(Products.Actions.getProducts())
  }, [dispatch])

  return <ProductCard classes={classes} products={products} isLoading={isLoading} />
}
export default ProductCardContainer
