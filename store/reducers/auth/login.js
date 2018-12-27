import Actions from '../../actions/actionTypes'

const loginReducer = (state = { user:null }, action) => {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload
            })
        case Actions.LOGIN_FAILED:
            return Object.assign({}, state, {
                user: { invalidCreds: true }
            })
        case Actions.GOOGLE_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload
            })
        case Actions.GOOGLE_LOGIN_FAILED:
            return Object.assign({}, state, {
                user: action.payload
            })
        case Actions.GOOGLE_LOGIN_ERROR:
            return Object.assign({}, state, {
                user: action.payload
            })
        default:
            return state
    }
}

export default loginReducer