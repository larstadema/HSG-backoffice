import {
  SET_ORDERS,
  LOADING_ORDERS,
  LOADING_UI,
  STOP_LOADING_UI,
} from '../types'

import Fire from '../../util/Fire'

export const getAllOrders = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_ORDERS })
  const unsubscribe = db
    .collection('orders')
    .orderBy('createdAt', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        let ordersReturn = []
        querySnapshot.forEach(function (doc) {
          ordersReturn.push({
            orderId: doc.id,
            userId: doc.data().userId,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            phonenumber: doc.data().phonenumber,
            cartItems: doc.data().cartItems
          })
        })
        dispatch({
          type: SET_ORDERS,
          payload: ordersReturn,
        })
      },
      function (error) {
        unsubscribe()
        console.log(error)
      }
    )
  return unsubscribe
}

export const  addProduct = (productData) => (dispatch) =>{
  dispatch({ type: LOADING_UI })
  const db = Fire.firestore()
  db.collection('products').add(productData).then(function(){
    dispatch({ type: STOP_LOADING_UI })
  })
}

export const editProduct =(productData) =>(dispatch)=>{
  dispatch({ type: LOADING_UI})
  const db = Fire.firestore()
  db.collection('products').doc(productData.productId).update(productData).then(function(){
    dispatch({ type: STOP_LOADING_UI  })
  })
}