import React from 'react'

import { Container, Grid, CssBaseline } from '@material-ui/core'

import { ProductCard } from './ProductCard'
import { AddProductButton } from './AddProductButton'


export const ProductsUI = ({ isOpen, classes }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={isOpen ? classes.contentOpen : classes.content}>
        <div className={classes.toolbar} />
        <Container >
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
             <AddProductButton />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ProductCard />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default ProductsUI
