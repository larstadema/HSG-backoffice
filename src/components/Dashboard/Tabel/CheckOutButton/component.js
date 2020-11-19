import React, { Fragment } from 'react'

import CustomButton from '../../../Button/CustomButton'

import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export const CheckOutButton = (props) => {
  return (
    <Fragment>
      <CustomButton tip="Uitchecken" onClick={props.handleOpen}>
        <ExitToAppIcon color="secondary" />
      </CustomButton>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={props.classes.dialogTitle}>
          Weet je zeker dat je deze persoon wilt uitchecken?
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Annuleren
          </Button>
          <Button onClick={props.handleCheckOut} color="secondary">
            Uitchecken
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default CheckOutButton
