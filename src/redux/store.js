import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './user/reducer'
import dataReducer from './data/reducer'
import uiReducer from './ui/reducer'
import productReducer from './products/reducer'
import ordersReducer from './orders/reducer'

import { verifyAuth } from './user/actions'

function saveThemeToLocalStorage(state) {
  try {
    let savedState = state
    localStorage.setItem('dark', savedState)
  } catch (e) {
    console.log(e)
  }
}
function saveBackupToLocalStorage(state) {
  try {
    let saved = state
    localStorage.setItem('backup', JSON.stringify(saved))
  } catch (e) {
    console.log(e)
  }
}

function loadThemeFromLocalStorage() {
  let serializedState = JSON.parse(localStorage.getItem('dark') || '[]')
  if (serializedState === null) {
    serializedState = false
  }
  return serializedState
}

function loadBackupState() {
  try {
    const serializedState = localStorage.getItem('backup') || '[]';
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const persistedState = loadThemeFromLocalStorage();
const persist = loadBackupState();

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  products: productReducer,
  orders: ordersReducer,
  UI: uiReducer,

  persisted: persistedState,
  persistBackup: persist || (() => null),
})
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))
const store = createStore(reducers, initialState, enhancer)

store.dispatch(verifyAuth())
store.subscribe(() => saveBackupToLocalStorage(store.getState().user.backup))
store.subscribe(() => saveThemeToLocalStorage(store.getState().UI.dark))


export default store
