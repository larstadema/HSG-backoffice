import React, { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import MinusButton from './component'

import { Data } from '../../../../redux'


export const MinusButtonContainer = ({ dateId, reservationId, disabled }) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(Data.Actions.setMinus(dateId, reservationId))
  }, [dateId, reservationId, dispatch])
  return <MinusButton handleClick={handleClick} disabled={disabled} />
}

export default MinusButtonContainer
