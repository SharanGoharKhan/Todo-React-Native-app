import React from 'react';
import { View, Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import styles from './styles'

class RegisterScreen extends React.Component {


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
                                <Text style={styles.logoContainerHeadline}>Create Account</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                            <View style={{ flex: 1 }} >
                                <View style={styles.formContainer}>
                                    <View style={styles.formContainerUsernameBox}>
                                        <Icon style={styles.formContainerUsernameIcon} type="FontAwesome" name='user' />
                                        <TextInput style={styles.formContainerUsernameInput} keyboardType='email-address' returnKeyType='next' placeholder="Username" />
                                    </View>
                                    <View style={styles.formContainerUsernameBox}>
                                        <Icon style={styles.formContainerUsernameIcon} type="MaterialCommunityIcons" name='email' />
                                        <TextInput style={styles.formContainerUsernameInput} keyboardType='email-address' returnKeyType='next' placeholder="Email" />
                                    </View>
                                    <View style={styles.formContainerPasswordBox}>
                                        <Icon style={styles.formContainerPasswordIcon} type="FontAwesome" name='lock' />
                                        <TextInput style={styles.formContainerPasswordInput} placeholder="Password" returnKeyType='next' secureTextEntry={true} />
                                    </View>
                                    <View style={styles.formContainerUsernameBox}>
                                        <Icon style={styles.formContainerUsernameIcon} type="FontAwesome" name='lock' />
                                        <TextInput style={styles.formContainerPasswordInput} placeholder="Confirm Password" returnKeyType='next' secureTextEntry={true} />
                                    </View>
                                    <View style={styles.formContainerLoginBox}>
                                        <Button style={styles.formContainerLoginButton} block success><Text>Continue</Text></Button>
                                    </View>
                                    <View style={{flex: 1}} />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ImageBackground>

        )
    }
}
export default RegisterScreen