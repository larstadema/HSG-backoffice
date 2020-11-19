import {
  LOADING_DATA,
  SET_EVENTS,
  SET_EVENT,
  POST_EVENT,
  SUBMIT_EVENT_COMMENT,
  DELETE_EVENT,
  SET_STAMPED,
  SET_STAMPABLE,
  SET_DATES,
  SET_SUCCES,
  SET_RESERVATIONS,
  SET_MINUS,
  SET_PLUS,
  CHECKOUT,
  SET_OLD_RESERVATIONS,
  ADD_DATE,
  CLOSE_DAY,
  REMOVE_DAY,
  SET_ACTIVEDAYS,
} from '../types'

const initialState = {
  events: [],
  event: {},
  stamped: [],
  stampable: [],
  stamp: {},
  dates: [],
  reservations: [],
  oldReservations: [],
  activeReservations: [],
  loading: false,
  success: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    //EVENTS
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      }
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      }
    case DELETE_EVENT:
      let deleteEventIndex = state.events.findIndex((event) => event.eventId === action.payload)
      state.events.splice(deleteEventIndex, 1)
      return {
        ...state,
      }
    case POST_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      }
    case SUBMIT_EVENT_COMMENT:
      return {
        ...state,
        event: {
          ...state.event,
          eventComments: [action.payload, ...state.event.eventComments],
        },
      }

    //Stamps
    case SET_STAMPABLE:
      return {
        ...state,
        stampable: action.payload,
        loading: false,
      }
    case SET_STAMPED:
      return {
        ...state,
        stamped: action.payload,
        loading: false,
      }
    //Reservations
    case SET_DATES:
      return {
        ...state,
        dates: action.payload,
        loading: false,
      }
    case SET_SUCCES:
      return {
        ...state,
        succes: true,
      }
    case SET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        loading: false,
      }
    case SET_MINUS:
      return {
        ...state,
        reservations: action.payload,
      }
    case SET_PLUS:
      return {
        ...state,
        reservations: action.payload,
      }
    case CHECKOUT:
      return {
        ...state,
        reservations: action.payload,
      }

    case SET_OLD_RESERVATIONS:
      return {
        ...state,
        oldReservations: action.payload,
      }
    case SET_ACTIVEDAYS:
      return {
        ...state,
        activeReservations: action.payload,
      }
    case ADD_DATE:
      return {
        ...state,
        dates: [action.payload, ...state.dates],
      }
    case CLOSE_DAY:
      return {
        ...state,
        dates: [action.payload, ...state.dates],
      }
    case REMOVE_DAY:
      return {
        ...state,
        dates: [action.payload, ...state.dates],
      }
    default:
      return state
  }
}
