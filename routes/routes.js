import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
import Posts from '../components/posts'
import Counter from '../components/counter'
import LoginScreen from '../components/auth/loginScreen'
import RegisterScreen from '../components/auth/regScreen'
import Home from '../components/home/home'
import AuthLoading from '../ui/authLoading'
import SideBar from '../components/screens/sidebar'
import Calendar from '../components/screens/calender'
import MapScreen from '../components/screens/map'
import Chat from '../components/screens/chat'
import Charts from '../components/screens/charts'
import Todos from '../components/screens/todos'

const Drawer = createDrawerNavigator(
    {
        Home: { screen: Home },
        Calendar: { screen: Calendar },
        Map: { screen: MapScreen },
        Chat: { screen: Chat },
        Charts: { screen: Charts },
        Todos: { screen: Todos },
        Counter,
        Posts
    },
    {
        initialRouteName: 'Home',
        contentOptions: {
            activeTintColor: '#e91e63'
        },
        contentComponent: props => <SideBar {...props} />
    })
const authenticationNavigator = createStackNavigator(
    {
        LoginScreen,
        RegisterScreen
    }, {
        headerMode: 'none'
    })
const AppNavigator = createSwitchNavigator(
    {
        AuthLoading,
        Auth: authenticationNavigator,
        Drawer
    },
    {
        initialRouteName: 'AuthLoading'
    }
);
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer