import Actions from '../../actions/actionTypes'

const calendarReducer = (state = { selectedDate: getTodayDate() }, action) => {
    switch (action.type) {
        case Actions.SET_DATE:
            return Object.assign({}, state, {
                selectedDate: action.payload
            })
        default:
            return state
    }
}

const getTodayDate = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    return date
}

export default calendarReducer