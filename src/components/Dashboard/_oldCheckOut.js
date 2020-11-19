import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import CustomButton from '../Button/CustomButton'

// MUI Stuff
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { connect } from 'react-redux'
import { setCheckout } from '../../redux/actions/dataActions'

const styles = {
  dialogTitle: {
    fontSize: '1rem',
  },
}

class CheckOut extends Component {
  state = {
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  CheckOut = () => {
    this.props.setCheckout(this.props.dateId, this.props.reservationId)
    this.setState({ open: false })
  }
  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <CustomButton tip="Uitchecken" onClick={this.handleOpen} >
          <ExitToAppIcon color="secondary" />
        </CustomButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle className={classes.dialogTitle}>
            Weet je zeker dat je deze persoon wilt uitchecken?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuleren
            </Button>
            <Button onClick={this.CheckOut} color="secondary">
              Uitchecken
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

CheckOut.propTypes = {
  setCheckout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  reservationId: PropTypes.string.isRequired,
  dateId: PropTypes.string.isRequired,
}

export default connect(null, { setCheckout })(withStyles(styles)(CheckOut))
