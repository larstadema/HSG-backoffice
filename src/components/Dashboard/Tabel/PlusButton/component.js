import React from 'react'
import PropTypes from 'prop-types';
import CustomButton from '../../../Button/CustomButton'
import AddIcon from '@material-ui/icons/Add'

export const PlusButton = (props) => {
  return (
    <CustomButton
      onClick={props.handleClick}
      tip="plus"
      color="secondary"
    >
      <AddIcon />
    </CustomButton>
  )
}

PlusButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}
