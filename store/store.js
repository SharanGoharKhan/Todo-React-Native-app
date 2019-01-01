import { combineReducers, createStore } from 'redux'

import counterReducer from './reducers/counter'
import loginReducer from './reducers/auth/login'
import mapReducer from './reducers/maps/maps'

const AppReducers = combineReducers({
    counterReducer,
    loginReducer,
    mapReducer
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}


const store = createStore(rootReducer)

export default store