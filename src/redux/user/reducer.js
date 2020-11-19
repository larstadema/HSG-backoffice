import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  ADD_BACKUP,
  DELETE_BACKUP,
  TOGGLE_BACKUP,
} from '../types'

import { omit } from 'lodash'


const initialState = {
  authenticated: false,
  loading: false,
  credentials: {isAdmin: false},
  likes: [],
  attends: [],
  notifications: [],
  stamped: [],
  backup: JSON.parse(localStorage.getItem('backup') || '[]'),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      }
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        backup: state.backup,
        ...action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true))
      return {
        ...state,
      }
    case ADD_BACKUP: {
      const { id, content } = action.payload
      return {
        ...state,
        backup: {
          ...state.backup,
          [id]: {
            content,
            completed: false,
          },
        },
      }
    }
    case TOGGLE_BACKUP: {
      const { id } = action.payload
      return {
        ...state,
        backup: {
          ...state.backup,
          [id]: {
            ...state.backup[id],
            completed: !state.backup[id].completed,
          },
        },
      }
    }
    case DELETE_BACKUP: {
      const { id } = action.payload
      return {
        ...state,
        backup: omit(state.backup, id),
      }
    }
    default:
      return state
  }
}
