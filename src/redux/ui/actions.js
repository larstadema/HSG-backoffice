import { SET_NAV_OPEN, SET_THEME } from '../types'

export const setNavOpen = () => (dispatch) => {
  dispatch({ type: SET_NAV_OPEN })
}

export const setTheme = () => (dispatch) => {
  dispatch({
    type: SET_THEME,
  })
}
