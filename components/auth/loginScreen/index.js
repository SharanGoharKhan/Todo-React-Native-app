import React from 'react';
import { View, Image, ImageBackground, TextInput } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import styles from './styles'

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  onPressLearnMore = () => {
    console.log('hola')
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
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
                <View style={styles.formContainerUsernameBox}>
                  <Icon style={styles.formContainerUsernameIcon} type="FontAwesome" name='user'/>
                  <TextInput style={styles.formContainerUsernameInput} keyboardType='email-address' returnKeyType='next' placeholder="Enter your username/email" />
                </View>
                <View  style={styles.formContainerPasswordBox}>
                  <Icon style={styles.formContainerPasswordIcon} type="FontAwesome" name='lock' />
                  <TextInput style={styles.formContainerPasswordInput} placeholder="Enter your password" returnKeyType='done' secureTextEntry={true} />
                </View>
                <View style={styles.formContainerLoginBox}>
                  <Button style={styles.formContainerLoginButton} block success><Text>Login</Text></Button>
                </View>
                <View style={styles.orContainer}>
                  <View style={styles.orContainerLeft}></View>
                  <View><Text style={styles.orContainerText}>OR</Text></View>
                  <View style={styles.orContainerRight}></View>
                </View>
                <View style={styles.googleAuthContainer}>
                  <Button style={styles.googleAuthContainerButton} block danger>
                    <Image style={styles.googleAuthContainerImage} source={require('../../../assets/googleAuthImage.png')} />
                    <Text>Continue with Google</Text>
                  </Button>
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
