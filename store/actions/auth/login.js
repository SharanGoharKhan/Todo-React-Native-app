import Actions from '../actionTypes'

export const ValidateLogin = (username, password) => {
    if (username === 'admin@admin.com' && password === 'password')
        return ({
            type: Actions.LOGIN_SUCCESS,
            payload: { username }
        })
    return ({
        type: Actions.LOGIN_FAILED
    })

}
export const googleAuth = (result) => {

    return ({
        type: Actions.GOOGLE_LOGIN_SUCCESS,
        payload: result
    })

}

export const updateProfile = (name, email, photoUrl) => {
    return ({
        type: Actions.UPDATE_PROFILE,
        payload: {
            name, email, photoUrl
        }
    })
}