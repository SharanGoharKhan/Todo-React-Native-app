import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button } from 'native-base'
import styles from "./styles";

class ForgotScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text>Forgot your password?</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.formContainerUsernameInput}
                        keyboardType='email-address' returnKeyType='next'
                        placeholder="Email"
                    />
                </View>
                <View>
                    <Button
                        block
                        success>
                        <Text>Send Email</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default ForgotScreen
