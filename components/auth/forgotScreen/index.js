import React from 'react'
import { View, Text, TextInput, ImageBackground } from 'react-native'
import { Button, Icon } from 'native-base'
import styles from "./styles";
import Validate from 'validate.js'

class ForgotScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.validateEmail = this.validateEmail.bind(this)
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
    onSendEmail() {
        alert('email sent')
    }

    render() {
        return (
            <ImageBackground style={styles.ImageBackground}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center' }}>
                    <View style={{ width: '80%'}}>
                        <View style={{alignItems:'center',marginBottom:20}}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Forgot your password?</Text>
                        </View>
                        <View style={styles.formContainerBoxContainer}>
                            <View style={styles.formContainerUsernameBox}>
                                <Icon style={styles.formContainerUsernameIcon} type="AntDesign" name='mail' />
                                <TextInput
                                    style={styles.formContainerUsernameInput}
                                    keyboardType='email-address' returnKeyType='next'
                                    placeholder="email"
                                    onBlur={this.validateEmail}
                                    onChangeText={(value) => { this.setState({ username: value.trim() }) }}
                                    value={this.state.username}
                                    ref={input => { this.usernameInput = input }} />
                            </View>
                            <Text style={styles.formContainerValidation}>{this.state.usernameError}</Text>
                        </View>
                        <View style={styles.formContainerLoginBox}>
                            <Button
                                style={styles.formContainerLoginButton}
                                block
                                success
                                onPress={() => { this.onSendEmail() }}>
                                <Text style={{ color: 'white' }}>Send Email</Text></Button>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}



export default ForgotScreen
