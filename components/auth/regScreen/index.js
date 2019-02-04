import React from 'react';
import { View, Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import styles from './styles'
import Validate from 'validate.js'
import KeyboardShift from '../../utility/KeyboardShift'

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

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            usernameError: null,
            passwordError: null
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
        this.setState({ usernameError: '' })
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
            <ImageBackground style={styles.ImageBackground}>
                <View style={styles.ScreenContainer}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainerImageBox}>
                                <Image style={styles.logoContainerImage} source={require('../../../assets/todo_logo.png')} />
                            </View>
                            <View style={styles.logoContainerHeadlineBox}>
                                <Text style={styles.logoContainerHeadline}>Create Account</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop:30 }} >

                        <KeyboardShift >
                            <View style={{ flex: 1 }} >
                                <View style={styles.formContainer}>
                                    <View style={styles.formContainerUsernameBox}>
                                        <Icon style={styles.formContainerUsernameIcon} type="AntDesign" name='user' />
                                        <TextInput style={styles.formContainerUsernameInput}
                                            keyboardType='email-address'
                                            returnKeyType='next'
                                            placeholder="Username" />
                                    </View>
                                    <View style={styles.formContainerBoxContainer}>
                                        <View style={styles.formContainerUsernameBox}>
                                            <Icon style={styles.formContainerUsernameIcon} type="AntDesign" name='mail' />
                                            <TextInput style={styles.formContainerUsernameInput}
                                                keyboardType='email-address'
                                                returnKeyType='next'
                                                placeholder="Email"
                                                onBlur={this.validateEmail}
                                                onChangeText={(value) => { this.setState({ username: value.trim() }) }}
                                                value={this.state.username}
                                                ref={input => { this.usernameInput = input }} />
                                        </View>
                                        <Text style={styles.formContainerValidation}>{this.state.usernameError}</Text>
                                    </View>
                                    <View style={styles.formContainerBoxContainer}>
                                        <View style={styles.formContainerPasswordBox}>
                                            <Icon style={styles.formContainerPasswordIcon} type="AntDesign" name='lock' />
                                            <TextInput style={styles.formContainerPasswordInput}
                                                placeholder="Password"
                                                returnKeyType='next'
                                                secureTextEntry={true}
                                                onBlur={this.validatePassword}
                                                onChangeText={(value) => { this.setState({ password: value.trim() }) }}
                                                ref={input => { this.passwordInput = input }} />
                                        </View>
                                        <Text style={styles.formContainerValidation}>{this.state.passwordError}</Text>
                                    </View>
                                    <View style={styles.formContainerBoxContainer}>
                                        <View style={styles.formContainerPasswordBox}>
                                            <Icon style={styles.formContainerPasswordIcon} type="AntDesign" name='lock' />
                                            <TextInput style={styles.formContainerPasswordInput}
                                                placeholder="Confirm Password"
                                                returnKeyType='next'
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <Text style={styles.formContainerValidation}>{this.state.passwordError}</Text>
                                    </View>
                                    <View style={styles.formContainerLoginBox}>
                                        <Button style={styles.formContainerLoginButton} block success><Text>Continue</Text></Button>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                </View>
                            </View>
                        </KeyboardShift>
                        </View>

                    </View>
                </View>
            </ImageBackground>

        )
    }
}
export default RegisterScreen