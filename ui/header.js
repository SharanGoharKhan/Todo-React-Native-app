import React from 'react'
import { DrawerActions } from 'react-navigation-drawer';
import {
    Header,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Body
} from "native-base";
import { StatusBar } from 'react-native'

class HeaderView extends React.Component {
    render() {
        return (
            <Header 
            style={{paddingTop: StatusBar.currentHeight,backgroundColor: '#6200EE'}}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigationObj.dispatch(DrawerActions.toggleDrawer())}
                    >
                        <Icon name="ios-menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        )
    }
}

export default HeaderView