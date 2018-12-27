import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, Button } from 'react-native'
import Validate from 'validate.js'
import { ValidateLogin } from '../../store/actions/auth/login'

const constraints = {
    username,
    password
};
const username = {
    presence: true,
    email: true
}
const password = {
    presence: true,
    length: {
        minimum: 6
    }
}


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: ''
        }

        this.validateEmail = this.validateEmail.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
    }

    validateEmail(e) {
        const error = Validate({ username: this.state.username }, { username })
        if (error) {
            console.log(error)
            this.setState({ usernameError: error.username[0] })
            return false
        }
        this.setState({ usernameError:''})
        return true
    }

    validatePassword(e) {
        const error = Validate({ password: this.state.password }, { password })
        if (error) {
            console.log(error)
            this.setState({ passwordError: error.password[0] })
            return false
        }
        this.setState({ passwordError: '' })
        return true
    }

    validateLogin(username, password) {
        if (!this.validateEmail()) {
            this.usernameInput.focus()
            return
        }
        if (!this.validatePassword()) {
            this.passwordInput.focus()
            return
        }
        this.props.validateLogin(username, password)
    }
    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.user)}</Text>
                <Text>Login screen</Text>
                <Text>{this.state.passwordError}</Text>
                <Text>{this.state.usernameError}</Text>
                <TextInput
                    onBlur={this.validateEmail}
                    placeholder='Email'
                    onChangeText={(value) => { this.setState({ username: value.trim() }) }}
                    value={this.state.username}
                    ref={input => { this.usernameInput = input }} />
                <TextInput
                    onBlur={this.validatePassword}
                    onChangeText={(value) => { this.setState({ password: value.trim() }) }}
                    secureTextEntry={true}
                    placeholder='password'
                    ref={input => { this.passwordInput = input }} />
                <Button
                    title='Signin'
                    onPress={() => { this.validateLogin(this.state.username, this.state.password) }} />
                                  
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => ({
    validateLogin: (username, password) => dispatch(ValidateLogin(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
