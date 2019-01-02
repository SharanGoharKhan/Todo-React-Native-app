import React from 'react'
import styles from './style'

import { Image, View } from 'react-native'
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge
} from 'native-base'

const drawerCover = require('../../../assets/background-login.png')
const drawerImage = require('../../../assets/todo_logo.png')

const datas = [
    {
        name: 'Home',
        route: 'Home',
        icon: 'md-home',
        type: 'Ionicons',
        bg: '#C5F442'
    },
    {
        name: 'Profile',
        route: 'Profile',
        icon: 'user',
        type: 'AntDesign'
    },
    {
        name: 'Calendar',
        route: 'Calendar',
        icon: 'md-calendar',
        type: 'Ionicons',
        bg: '#C5F442',
        types: '10'
    },
    {
        name: 'Map',
        route: 'Map',
        icon: 'md-map',
        type: 'Ionicons',
        bg: '#4DCAE0'
    },
    {
        name: 'Chat',
        route: 'Chat',
        icon: 'md-chatboxes',
        type: 'Ionicons',
        bg: '#9F897C',
        types: "5"
    },
    {
        name: 'Charts',
        route: 'Charts',
        icon: 'barschart',
        type: 'AntDesign',
        bg: '#C5442'
    },
    {
        name: 'Todos',
        route: 'Todos',
        icon: 'done',
        type: 'MaterialIcons',
        bg: '#C5442'
    }
];

class SideBar extends React.Component {
    render() {
        return (

            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={drawerImage} />

                    <List
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        type={data.type}
                                        style={{ color: "#777", fontSize: 26, width: 30 }}
                                    />
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                                {data.types &&
                                    <Right style={{ flex: 1 }}>
                                        <Badge
                                            style={{
                                                borderRadius: 3,
                                                height: 25,
                                                width: 72,
                                                backgroundColor: data.bg
                                            }}
                                        >
                                            <Text
                                                style={styles.badgeText}
                                            >{`${data.types} Types`}</Text>
                                        </Badge>
                                    </Right>}
                            </ListItem>}
                    />
                </Content>
            </Container>
        )
    }
}

export default SideBar;