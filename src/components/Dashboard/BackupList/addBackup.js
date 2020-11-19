import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBackup } from '../../../redux/actions/userActions'


import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function AddTodo({ addBackup}) {
  const classes = useStyles();
  const [value, setValue] = useState('')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }
  const handleAdd = () => {
    setValue('')
    addBackup(value)
  }

  return (
    <div className={classes.root}>
    <InputBase
        className={classes.input}
        placeholder="Voer naam in"
        type="text" onChange={handleOnChange} value={value}
      />
     <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="secondary" onClick={handleAdd} className={classes.iconButton} aria-label="add-backup">
        <PersonAddIcon />
      </IconButton>
    </div>
  )
}

export default connect(null, { addBackup })(AddTodo)
