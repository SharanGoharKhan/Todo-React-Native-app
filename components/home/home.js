import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
class Home extends Component {
    render() {
        return (
            <View>
                <Text>
                    Home
                </Text>
                <Button
                    title='Open Drawer'
                    onPress={()=>{this.props.navigation.openDrawer()}} />
            </View>
        )
    }
}

export default Home