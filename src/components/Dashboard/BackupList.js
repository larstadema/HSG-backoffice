import React from 'react'
import { connect } from 'react-redux'

import { getReservations } from '../../redux/actions/dataActions'

import { makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import AddBackup from './BackupList/addBackup'
import BackUpList from './BackupList/BackUpList'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
}))
export const BackupList = (props) => {

  const classes = useStyles()
  return (
    <div>
      <Grid item sm={12} md={12} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.pageTitle}>
            Backup Lijst
          </Typography>
            <Grid item sm={12} md={12} xs={12}>
              <AddBackup />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <BackUpList />
            </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  reservations: state.data.reservations,
})

const mapDispatchToProps = {
  getReservations,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupList)
