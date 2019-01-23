import React, { Component } from 'react'
import * as Expo from 'expo'
import { Text, View, Image, AsyncStorage } from 'react-native'
import { Button } from 'native-base';
import { connect } from 'react-redux'
import { googleAuth } from '../../../../store/actions/auth/login'
import styles from './styles'

class GoogleAuth extends Component {
    constructor(props) {
        super(props)
    }
    async googleAuth() {
        const result = await Expo.Google.logInAsync({
            androidClientId: '86072608741-lsoi8hcke2t8m7qvomhe0omod0serebm.apps.googleusercontent.com',
            iosClientId: '86072608741-prt8fmiq3qbhqv9citf32qk21o4r33nk.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        })
        if (result.type === 'success') {
            const resp = await AsyncStorage.setItem('userToken', JSON.stringify(result.user));
            this.props.googleAuth(result.user)
            this.props.navigateHome()
        }

    }
    render() {
        return (
            <View>
                <Button
                    style={styles.googleAuthContainerButton}
                    block
                    danger
                    onPress={() => {
                        this.googleAuth()
                    }}>
                    <Image style={styles.googleAuthContainerImage} source={require('../../../../assets/googleAuthImage.png')} />
                    <Text style={styles.googleAuthContainerText}>Continue with Google</Text>
                </Button>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => ({
    googleAuth: (result) => dispatch(googleAuth(result))
})


export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth)