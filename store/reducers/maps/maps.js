import Actions from '../../actions/actionTypes'

const mapReducer = (state = { location: { coords: { latitude: 37.78825, longitude: -122.4324 } } }, action) => {
    switch (action.type) {
        case Actions.SET_LOCATION:
            return Object.assign({}, state, {
                location: action.payload
            })
        default:
            return state
    }
}

export default mapReducer