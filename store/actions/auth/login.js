import * as Expo from 'expo'
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
export const googleAuth = async () => {

    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: '86072608741-lsoi8hcke2t8m7qvomhe0omod0serebm.apps.googleusercontent.com',
            iosClientId: '86072608741-prt8fmiq3qbhqv9citf32qk21o4r33nk.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        })
        if (result.type === 'success') {
            return ({
                type: Actions.GOOGLE_LOGIN_SUCCESS,
                payload: result
            })
        }
        else {
            return {
                type: Actions.GOOGLE_LOGIN_FAILED,
                payload: result
            };
        }
    }
    catch (err) {
        return {
            type: Actions.GOOGLE_LOGIN_ERROR,
            payload: err
        }
    };

}