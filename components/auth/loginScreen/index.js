import React from 'react';
import { connect } from 'react-redux'
import { View, Image, ImageBackground, TextInput } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import styles from './styles'
import Validate from 'validate.js'
import { ValidateLogin } from '../../../store/actions/auth/login'
import GoogleSignIn from './googleAuth'

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

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
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
      <ImageBackground style={styles.ImageBackground} source={require('../../../assets/background-login.png')}>
        <View style={styles.ScreenContainer}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <View style={styles.logoContainerImageBox}>
                <Image style={styles.logoContainerImage} source={require('../../../assets/todo_logo.png')} />
              </View>
              <View style={styles.logoContainerHeadlineBox}>
                <Text style={styles.logoContainerHeadline}>Welcome to Todo App</Text>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formContainerBoxContainer}>
                <View style={styles.formContainerUsernameBox}>
                  <Icon style={styles.formContainerUsernameIcon} type="FontAwesome" name='user' />
                  <TextInput
                    style={styles.formContainerUsernameInput}
                    keyboardType='email-address' returnKeyType='next'
                    placeholder="Enter your username/email"
                    onBlur={this.validateEmail}
                    onChangeText={(value) => { this.setState({ username: value.trim() }) }}
                    value={this.state.username}
                    ref={input => { this.usernameInput = input }} />
                </View>
                <Text style={styles.formContainerValidation}>{this.state.usernameError}</Text>
              </View>
              <View style={styles.formContainerBoxContainer}>
                <View style={styles.formContainerPasswordBox}>
                  <Icon style={styles.formContainerPasswordIcon} type="FontAwesome" name='lock' />
                  <TextInput
                    style={styles.formContainerPasswordInput}
                    placeholder="Enter your password"
                    returnKeyType='done'
                    secureTextEntry={true}
                    onBlur={this.validatePassword}
                    onChangeText={(value) => { this.setState({ password: value.trim() }) }}
                    secureTextEntry={true}
                    ref={input => { this.passwordInput = input }} />
                </View>
                <Text style={styles.formContainerValidation}>{this.state.passwordError}</Text>
              </View>
              <View style={styles.formContainerLoginBox}>
                <Button
                  style={styles.formContainerLoginButton}
                  block
                  success
                  onPress={() => { this.validateLogin(this.state.username, this.state.password) }}><Text>Login</Text></Button>
              </View>
              <View style={styles.orContainer}>
                <View style={styles.orContainerLeft}></View>
                <View><Text style={styles.orContainerText}>OR</Text></View>
                <View style={styles.orContainerRight}></View>
              </View>
              <View style={styles.googleAuthContainer}>
                <GoogleSignIn/>
              </View>
              <View style={styles.formFooterContainer}>
                <Text style={styles.formFooterForgot}>Forgot password?</Text>
                <Text style={styles.formFooterSignUp}>New here? Sign Up</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => ({
  validateLogin: (username, password) => dispatch(ValidateLogin(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)