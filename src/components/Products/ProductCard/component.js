import React from 'react'

import {
  Grid,
  Typography,
  Chip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core'

import { EditProductButton } from '../EditProductButton'

export const ProductCard = ({ isLoading, classes, products }) => {
  if (isLoading) {
    return 'Loading...'
  }
  return (
    <Grid container spacing={3}>
      {products.map((item, index) => (
        <Grid item key={item.productId} lg={3} md={6} xs={12}>
          <Card className={classes.root}>
            <CardHeader
              action={
                <EditProductButton
                  productName={item.productName}
                  productDescription={item.productDescription}
                  productPrice={item.productPrice}
                  visible={item.visible}
                  productId={item.productId}
                  productImage={item.productImage}
                />
              }
              title={item.productName}
              subheader={`Prijs: €${item.productPrice},-`}
            />
            <CardMedia
              className={classes.media}
              image={item.productImage}
              title={item.productDescription}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p"></Typography>
              <Typography>Omschrijving: {item.productDescription}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Chip
                size="small"
                label={item.visible ? `Beschikbaar` : `Niet beschikbaar`}
                color="secondary"
                className={item.visible ? classes.chipVisible : classes.chipInvisible}
              />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductCard
