import Actions from '../actionTypes'

export const setLocation = (location) => {
    return ({
        type: Actions.SET_LOCATION,
        payload: location
    })
}