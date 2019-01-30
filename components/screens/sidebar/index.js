import React from 'react'
import styles from './style'
import { connect } from 'react-redux'
import { Image, ImageBackground, AsyncStorage } from 'react-native'
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button
} from 'native-base'
const default_img = 'https://i1.wp.com/www.royalsmushicafe.dk/wp-content/uploads/2016/02/Profile-Placeholder.jpg?ssl=1'
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
        name: 'Todos',
        route: 'Todos',
        icon: 'done',
        type: 'MaterialIcons',
        bg: '#C5442'
    }
];

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.previous_link = ""
        let data_store = []
        this.state = {
            activeRoute: "Home",
        }
    }
    async _getUserToken() {
        const userToken = await AsyncStorage.getItem('userToken');
        this.setState({ user: JSON.parse(userToken) })
    }
    async _removeUserToken() {
        const resp = await AsyncStorage.removeItem('userToken')
        this.setState({ user: null })
        this.props.navigation.navigate('Auth')
    }

    navigateRoute = (route) => {
        this.previous_link = this.state.activeRoute
        this.setState({ activeRoute: route.trim() })
        this.props.navigation.navigate(route)
    }


    componentDidMount = () => {
        this.setState({ activeRoute: this.props.activeItemKey.trim() })
    }

    DeepCopy = (data_list) => {
        let net_data = []
        data_list.forEach(element => {
            obj = {
                bg: element.bg,
                icon: element.icon,
                name: element.name,
                route: element.route,
                type: element.type,
            }
            net_data.push(obj)

        });

        return net_data
    }
    render = () => {
        if (this.state.previous_link != this.state.activeRoute)
            new_data = this.DeepCopy(datas)
        previous_link = this.state.activeRoute
        return (

            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >

                    <ImageBackground style={styles.drawerCover}>
                        <Content style={styles.cover_content}>
                            <Image style={styles.profile_pic} source={{uri: this.props.user.photoUrl  ? this.props.user.photoUrl : default_img}} />
                            <Text style={styles.profile_name} >{this.props.user.name ? this.props.user.name : "UNKNOWN" } </Text>
                            <Text style={styles.profile_email} >{this.props.user.email ? this.props.user.email : "unknownsmtp@provider.com"}</Text>
                        </Content>
                    </ImageBackground>

                    <List
                        style={{ marginBottom: 0, paddingBottom: 0 }}
                        dataArray={new_data}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                extraData={this.state}
                                onPress={() => this.navigateRoute(data.route)}
                                style={[styles.list_item, this.state.activeRoute == data.name.trim() ? styles.dark_background : ""]}

                            >

                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        type={data.type}
                                        style={[this.state.activeRoute == data.name.trim() ? styles.active_link : "", { fontSize: 26, width: 30 }]}
                                    />
                                    <Text style={[styles.text, this.state.activeRoute == data.name.trim() ? styles.active_link : ""]}>
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




                    <ListItem style={{ marginLeft: 0, paddingLeft: 20, marginTop: 0, paddingTop: 10 }} onPress={() => { this._removeUserToken() }}>
                        <Left>
                            <Icon
                                active
                                name={"logout"}
                                type={"MaterialCommunityIcons"}
                                style={[{ fontSize: 26, width: 30 }]}
                            />
                            <Text style={styles.text}>Log Out</Text>


                        </Left>


                    </ListItem>



                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.loginReducer.user,
})
export default connect(mapStateToProps, null)(SideBar);