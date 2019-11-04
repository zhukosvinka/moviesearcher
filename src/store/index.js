import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import mainReducer from '../reducers/reducer'

const store = createStore(mainReducer, applyMiddleware(thunk))
window.store = store

export default store
