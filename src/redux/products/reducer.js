import {
  SET_PRODUCTS,
  // SUBMIT_ORDER,
  // ADD_PRODUCT,
  // DELETE_PRODCUT,
  EDIT_PRODUCT,
  // ADD_TO_CART,
  LOADING_PRODUCTS,
  STOP_LOADING_PRODUCTS,
} from '../types'

const initialState = {
  products: [],
  cart: [],
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING_PRODUCTS:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
