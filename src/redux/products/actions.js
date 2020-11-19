import {
  SET_PRODUCTS,
  LOADING_PRODUCTS,
  LOADING_UI,
  STOP_LOADING_UI,

} from '../types'

import Fire from '../../util/Fire'

export const getProducts = () => (dispatch) => {
  const db = Fire.firestore()
  dispatch({ type: LOADING_PRODUCTS })
  const unsubscribe = db
    .collection('products')
    .orderBy('productName', 'asc')
    .onSnapshot(
      function (querySnapshot) {
        let productsReturn = []
        querySnapshot.forEach(function (doc) {
          productsReturn.push({
            productId: doc.id,
            productName: doc.data().productName,
            productDescription: doc.data().productDescription,
            productPrice: doc.data().productPrice,
            productImage: doc.data().productImage,
            visible: doc.data().visible
          })
        })
        dispatch({
          type: SET_PRODUCTS,
          payload: productsReturn,
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