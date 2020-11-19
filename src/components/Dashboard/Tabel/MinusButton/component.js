import React from 'react'
import PropTypes from 'prop-types'
import CustomButton from '../../../Button/CustomButton'
import RemoveIcon from '@material-ui/icons/Remove'

export const MinusButton = (props) => {
  return (
    <CustomButton onClick={props.handleClick} tip="min" color="secondary" disabled={props.disabled}>
      <RemoveIcon />
    </CustomButton>
  )
}

MinusButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
export default MinusButton
