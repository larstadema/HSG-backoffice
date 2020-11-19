import {
  SET_SCREAMS,
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_EVENTS,
  SET_EVENT,
  POST_EVENT,
  DELETE_EVENT,
  SET_STAMPABLE,
  SET_DATES,
  SET_RESERVATIONS,
  SET_OLD_RESERVATIONS,
  ADD_DATE,
  SET_ACTIVEDAYS,
} from '../types'
import axios from 'axios'
import Fire from '../../util/Fire'

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      })
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      })
    })
}
//EVENTS
export const getEvents = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/events')
    .then((res) => {
      dispatch({
        type: SET_EVENTS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_EVENTS,
        payload: [],
      })
    })
}
export const getEvent = (eventId) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`/event/${eventId}`)
    .then((res) => {
      dispatch({
        type: SET_EVENT,
        payload: res.data,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => console.log(err))
}

export const postEvent = (newEvent) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/event', newEvent)
    .then((res) => {
      dispatch({
        type: POST_EVENT,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const uploadEventImage = (imageData, eventId) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post(`/event/image/${eventId}`, imageData)
    .then(() => {
      dispatch(getEvents())
    })
    .catch((err) => console.log(err))
}
export const deleteEvent = (eventId) => (dispatch) => {
  axios
    .delete(`/event/${eventId}`)
    .then(() => {
      dispatch({ type: DELETE_EVENT, payload: eventId })
    })
    .catch((err) => console.log(err))
}
//STAMPS
export const getStamps = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/stamps')
    .then((res) => {
      dispatch({
        type: SET_STAMPABLE,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_STAMPABLE,
        payload: [],
      })
    })
}
export const submitReservation = (newReservation) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  console.log(newReservation[0])
  Object.assign(newReservation.reservation, { coins: 0, active: true, body: '' })
  const reservationDoc = newReservation.reservation.dateId
  console.log(newReservation.reservation.dateId)

  const db = Fire.firestore()
  db.collection('reservationDates')
    .doc(reservationDoc)
    .collection('reservations')
    .doc()
    .set(newReservation.reservation)
    .then(function () {
      console.log('Document successfully written!')
    })
    .catch(function (error) {
      console.error('Error writing document: ', error)
    })
}
export const getDates = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_DATA })

  const unsubscribe = db
    .collection('reservationDates')
    .where('active', '==', true)
    .orderBy('date', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        dispatch({ type: LOADING_UI })
        let reservationDates = []
        querySnapshot.forEach((doc) => {
          reservationDates.push({
            dateId: doc.id,
            date: doc.data().date,
            bookedSeats: doc.data().bookedSeats,
            maxSeats: doc.data().maxSeats,
            maxPerPerson: doc.data().maxPerPerson,
            active: doc.data().active,
          })
        })

        dispatch({ type: STOP_LOADING_UI })
        dispatch({
          type: SET_DATES,
          payload: reservationDates,
        })
      },
      function (error) {
        unsubscribe()
      }
    )

  return unsubscribe
}
export const getActiveDays = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_UI })
  const unsubscribe = db
    .collectionGroup('reservations')
    .where('active', '==', true)
    .orderBy('date', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        let reservationsReturn = []
        querySnapshot.forEach(function (doc) {
          reservationsReturn.push({
            dateId: doc.id,
            date: doc.data().date,
            active: doc.data().active,
          })
        })
        dispatch({
          type: SET_ACTIVEDAYS,
          payload: reservationsReturn,
        })
        dispatch({ type: STOP_LOADING_UI })
      },
      function (error) {
        unsubscribe()
      }
    )
  return unsubscribe
}
export const getOldReservations = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_UI })
  const unsubscribe = db
    .collectionGroup('reservations')
    .where('active', '==', false)
    .orderBy('date', 'asc')
    .orderBy('uid', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        let reservationsReturn = []
        querySnapshot.forEach(function (doc) {
          reservationsReturn.push({
            reservationId: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            coins: doc.data().coins,
            body: doc.data().body,
            date: doc.data().date,
            dateId: doc.data().dateId,
            active: doc.data().active,
          })
        })
        dispatch({
          type: SET_OLD_RESERVATIONS,
          payload: reservationsReturn,
        })
        dispatch({ type: STOP_LOADING_UI })
      },
      function (error) {
        unsubscribe()
      }
    )
  return unsubscribe
}

export const getReservations = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_DATA })
  const unsubscribe = db
    .collectionGroup('reservations')
    .where('active', '==', true)
    .orderBy('date', 'asc')
    .orderBy('uid', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        let reservationsReturn = []
        querySnapshot.forEach(function (doc) {
          reservationsReturn.push({
            reservationId: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            coins: doc.data().coins,
            body: doc.data().body,
            date: doc.data().date,
            dateId: doc.data().dateId,
            active: doc.data().active,
          })
        })
        dispatch({
          type: SET_RESERVATIONS,
          payload: reservationsReturn,
        })
      },
      function (error) {
        unsubscribe()
      }
    )
  return unsubscribe
}
export const setMinus = (dateId, reservationId) => (dispatch) => {
  const db = Fire.firestore()
  let reservationRef = db
    .collection('reservationDates')
    .doc(dateId)
    .collection('reservations')
    .doc(reservationId)
  // eslint-disable-next-line
  let transaction = db.runTransaction((updateCoin) => {
    return updateCoin.get(reservationRef).then((doc) => {
      if (doc.data().coins <= 0) return
      let newCoins = doc.data().coins - 1
      updateCoin.update(reservationRef, { coins: newCoins })
    })
  })
}
export const setPlus = (dateId, reservationId) => (dispatch) => {
  const db = Fire.firestore()
  let reservationRef = db
    .collection('reservationDates')
    .doc(dateId)
    .collection('reservations')
    .doc(reservationId)
  // eslint-disable-next-line
  let transaction = db.runTransaction((updateCoin) => {
    return updateCoin.get(reservationRef).then((doc) => {
      let newCoins = doc.data().coins + 1
      updateCoin.update(reservationRef, { coins: newCoins })
    })
  })
}
export const setCheckout = (dateId, reservationId) => (dispatch) => {
  const db = Fire.firestore()
  let reservationRef = db
    .collection('reservationDates')
    .doc(dateId)
    .collection('reservations')
    .doc(reservationId)
  let reservationDateRef = db.collection('reservationDates').doc(dateId)
  // eslint-disable-next-line
  let transaction = db
    .runTransaction((t) => {
      return t.get(reservationRef).then((doc) => {
        t.update(reservationRef, { active: false })
      })
    })
    .then(() => {
      // eslint-disable-next-line
      let transaction2 = db.runTransaction((date) => {
        return date.get(reservationDateRef).then((doc) => {
          let seats = doc.data().bookedSeats - 1
          date.update(reservationDateRef, { bookedSeats: seats })
        })
      })
    })
    .catch((err) => {
      console.log('Transaction failure:', err)
    })
}
export const closeThisDay = (date) => (dispatch) => {
  const db = Fire.firestore()
  db.collection('reservationDates')
    .where('date', '==', date)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let dateRef = db.collection('reservationDates').doc(doc.id)
        // eslint-disable-next-line
        let close = dateRef.update({ bookedSeats: 20 })
      })
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}
export const removeDay = (date) => (dispatch) => {
  const db = Fire.firestore()
  db.collection('reservationDates')
    .where('date', '==', date)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let dateRef = db.collection('reservationDates').doc(doc.id)
        // eslint-disable-next-line
        let close = dateRef.update({ active: false })
      })
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}
export const addNewDate = (newDate) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/date', newDate)
    .then((res) => {
      dispatch({
        type: ADD_DATE,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
