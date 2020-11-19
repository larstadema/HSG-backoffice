import React, { Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import { AddProductForm } from '../AddProductForm'

export const AddProductButton = (props) => {
  return (
    <Fragment>
      <Button
        onClick={props.handleOpen}
        variant="contained"
        className={props.classes.button}
        color="secondary"
        startIcon={<AddIcon />}
      >
        Voeg product toe
      </Button>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={props.classes.dialogTitle}>Toevoegen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voeg hier een product toe. De afbeelding kan toegevoegd/aangepast worden na het
            toevoegen van het product.
          </DialogContentText>
          <AddProductForm />
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
export default AddProductButton
