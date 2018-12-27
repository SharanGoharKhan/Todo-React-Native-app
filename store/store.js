import { combineReducers, createStore } from 'redux'

import counterReducer from './reducers/counter'
import loginReducer from './reducers/auth/login'

const AppReducers = combineReducers({
    counterReducer,
    loginReducer
})

const rootReducer = (state, action) => {
    return AppReducers(state, action)
}


const store = createStore(rootReducer)

export default store