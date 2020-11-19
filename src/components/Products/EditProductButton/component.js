import React, { Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

import CustomButton from '../../Button/CustomButton'
import EditIcon from '@material-ui/icons/Edit'

import { EditProductForm } from '../EditProductForm'

export const EditProductButton = (props) => {
  return (
    <Fragment>
      <CustomButton tip="Wijzigen" onClick={props.handleOpen} btnClassName={props.classes.controls}>
        <EditIcon color="secondary" />
      </CustomButton>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={props.classes.dialogTitle}>Wijzigen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wijzig hier je product. De afbeelding kan aangepast worden na het
            toevoegen van het product.
          </DialogContentText>
          <EditProductForm
            productName={props.productName}
            productDescription={props.productDescription}
            productPrice={props.productPrice}
            visible={props.visible}
            productId={props.productId}
            productImage={props.productImage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Annuleren
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
export default EditProductButton
