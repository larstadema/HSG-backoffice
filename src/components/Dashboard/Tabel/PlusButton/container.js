import React, { useCallback } from 'react'

import {useDispatch } from 'react-redux'

import { PlusButton } from './component'
import { Data } from '../../../../redux/'


export const PlusButtonContainer = (props) => {
  const { dateId, reservationId } = props
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(Data.Actions.setPlus(dateId, reservationId))
  }, [dateId, dispatch, reservationId])

  return (
    <PlusButton handleClick={handleClick} />
  )
}

export default PlusButtonContainer
