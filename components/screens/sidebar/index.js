import React from 'react'
import styles from './style'
import { connect } from 'react-redux'
import { Image, AsyncStorage } from 'react-native'
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
    constructor(props) {
        super(props)
        //console.log(this.props)
        //console.log(this.props.activeItemKey)
        // this.state = {
        //     user: null
        // }
        // this._getUserToken()
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
        // change active pages
        //console.log("Routing to: ", route, "-")
       // console.log("Acive Route ", this.state.activeRoute)
        this.previous_link = this.state.activeRoute
        this.setState({ activeRoute: route.trim() })
        //this.setState({ counter: this.state.counter + 1 })
        this.props.navigation.navigate(route)
    }


    componentDidMount = () => {
        // set first page to home page
        //console.log("Initial route:",this.props.activeItemKey)
        //console.log(this.props.activeItemKey)
        this.setState({ activeRoute: this.props.activeItemKey.trim() })
        //console.log("Initial route:", this.state.activeRoute.trim(), "-")
    }

    DeepCopy = (data_list)=>{
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
        //console.log(datas)
        //console.log("Render called Current Counter is ", this.state.counter)

        //console.log("Render called Current State is ", this.state.activeRoute)
        //console.log(datas[0].counter = this.state.counter)
        //console.log(datas)
        //console.log("RENDER")
        //console.log("Prev: ", this.previous_link)
        //console.log("Current: ", this.state.activeRoute)
        
        if( this.state.previous_link != this.state.activeRoute )
            new_data = this.DeepCopy(datas)
        previous_link = this.state.activeRoute
        //console.log("New\n",new_data)
    
     
        return (

            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={{ uri: this.props.user ? this.props.user.photoUrl : null }} />
                    <Text>USERNAME: {this.props.user ? this.props.user.name : ''}</Text>
                    <Text> {this.state.counter} </Text>
                    <List
                        dataArray={new_data}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                extraData={this.state}
                                onPress={() => this.navigateRoute(data.route)}
                                style = { [ styles.list_item , this.state.activeRoute == data.name.trim() ? styles.dark_background : ""]}

                            >

                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        type={data.type}
                                        style={[ this.state.activeRoute == data.name.trim() ? styles.active_link : "",{ fontSize: 26, width: 30} ]}
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
                    <Button onPress={() => { this._removeUserToken() }}>
                        <Text>LOGOUT</Text>

                    </Button>
                    <Text>{JSON.stringify(this.props.user)}</Text>

                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.loginReducer.user,
})
export default connect(mapStateToProps, null)(SideBar);