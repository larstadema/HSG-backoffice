import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_NAV_OPEN,
  SET_THEME,
} from '../types'

const initialState = {
  loading: false,
  errors: null,
  open: false,
  dark: JSON.parse(localStorage.getItem('dark') || '[]'),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      }
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      }
    case SET_NAV_OPEN:
      return {
        ...state,
        open: !state.open,
      }
    case SET_THEME:
      return {
        ...state,
        dark: !state.dark,
      }
    default:
      return state
  }
}
