import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  STOP_LOADING_UI,
  ADD_BACKUP,
  TOGGLE_BACKUP,
  DELETE_BACKUP,
} from '../types'
import axios from 'axios'


import Fire from '../../util/Fire'
import { validateLoginData } from '../../util/Validators'

export const loginUser = (userData, history, test) => (dispatch) => {
  

  dispatch({ type: LOADING_UI })
  const { valid, errors } = validateLoginData(userData)

  if (!valid)
    return dispatch({
      type: SET_ERRORS,
      payload: errors,
    })

  Fire.auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then((response) => {
      if (response.user.emailVerified === false) {
        const notVerified = {
          general: `${userData.email} is niet geverifieerd. Check je inbox/spam om je account te activeren!`,
        }
        const user = Fire.auth().currentUser
        user
          .sendEmailVerification()
          .then(function () {
            console.log('Email sent')
          })
          .catch(function (error) {
            console.log('Send Email error.')
          })
        return dispatch({
          type: SET_ERRORS,
          payload: notVerified,
        })
      } else {
        dispatch({ type: SET_AUTHENTICATED })
        dispatch({ type: STOP_LOADING_UI })
        dispatch({ type: CLEAR_ERRORS })
      }
    })
    .catch((err) => {
      console.log(err)
      const invalid = { general: 'Foute inloggegevens, probeer het opnieuw' }
      dispatch({
        type: SET_ERRORS,
        payload: invalid,
      })
    })
}
export const verifyAuth = () => (dispatch) => {
  Fire.auth().onAuthStateChanged(user => {
    if (user !== null) {
      Fire.auth()
          .currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
              dispatch({ type: SET_AUTHENTICATED })
              user.getIdToken().then(function (idToken) {
                setAuthorizationHeader(idToken)
                dispatch(getUserData())
              })
            } else {
              dispatch({ type: SET_UNAUTHENTICATED })
            }
          })
          .catch((error) => {
            console.log(error)
          })
    }
    // dispatch({ type: SET_AUTHENTICATED })
  });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  Fire.auth()
    .signOut()
    .then(() => {
      dispatch({ type: SET_UNAUTHENTICATED })
    })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.log(err))
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      })
    })
    .catch((err) => console.log(err))
}
let nextTodoId = 0
export const addBackup = (content) => ({
  type: ADD_BACKUP,
  payload: {
    id: ++nextTodoId,
    content,
  },
})

export const toggleBackup = (id) => ({
  type: TOGGLE_BACKUP,
  payload: {
    id,
  },
})

export const deleteBackup = (id) => ({
  type: DELETE_BACKUP,
  payload: {
    id,
  },
})

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  //localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken
}
