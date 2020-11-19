import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { Data, User } from '../../../redux'

import AddGuest from './component'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: 20,
    marginBottom: 20,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  
}))

export const AddGuestContainer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const isLoading = useSelector(Data.Selectors.isLoading)
  const dates = useSelector(Data.Selectors.dates)
  const userId = useSelector(User.Selectors.credentials)

  useEffect(() => {
    dispatch(Data.Actions.getDates())
  }, [dispatch])

  return <AddGuest isLoading={isLoading} classes={classes} dates={dates} userId={userId} />
}

export default AddGuestContainer
