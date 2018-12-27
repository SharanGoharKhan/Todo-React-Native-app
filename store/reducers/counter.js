import Actions from '../actions/actionTypes'

const CounterReducer = (state = { count: 0, data: '', posts: [] }, action) => {
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            })
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1,
                data: action.payload
            })
        case Actions.FETCH_POSTS:
            return Object.assign({}, state, {
                posts: action.payload
            })
        default:
            return state
    }
}


export default CounterReducer
