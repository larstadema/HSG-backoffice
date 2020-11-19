import {
  SET_ORDERS,
  LOADING_ORDERS,
  STOP_LOADING_ORDERS,
} from '../types'

const initialState = {
  orders: [],
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        ...state,
        loading: true,
      }
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }
    case STOP_LOADING_ORDERS:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
