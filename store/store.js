import { combineReducers, createStore } from 'redux'

import counterReducer from './reducers/counter'
import loginReducer from './reducers/auth/login'
import mapReducer from './reducers/maps/maps'
import calendarReducer from './reducers/calendar/calendar'

const AppReducers = combineReducers({
    counterReducer,
    loginReducer,
    mapReducer,
    calendarReducer
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}


const store = createStore(rootReducer)

export default store