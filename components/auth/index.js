import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import Login from './login'
import GoogleAuth from './googleAuth'
class Index extends Component {
    render() {
        return (
            <View>
                <Text>Login index</Text>

                <Login />
                <GoogleAuth />
                <Button
                    onPress={() => { this.props.navigation.navigate('Register') }}
                    title='Register' />
                <Button
                    title='Logged in'
                    onPress={() => {
                        this.props.navigation.navigate('Drawer')
                    }} />
            </View>
        )
    }
}

export default Index
