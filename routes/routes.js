import React from 'react'
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator    
} from "react-navigation"
import LoginScreen from '../components/auth/loginScreen'
import RegisterScreen from '../components/auth/regScreen'
import AuthLoading from '../ui/authLoading'
import MapScreen from '../components/screens/map'
import Calendar from '../components/screens/calender'
import Chat from '../components/screens/chat'
import Charts from '../components/screens/charts'
import Todos from '../components/screens/todos'
import SideBar from '../components/screens/sidebar'
import Home from '../components/screens/home'


// const TopBarNavigator = createMaterialTopTabNavigator({
//     LoginScreen,
//     RegisterScreen
// },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let iconName;
//                 if (routeName === 'Login') {
//                     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//                 } else if (routeName === 'Register') {
//                     iconName = `ios-add-circle${focused ? '' : '-outline'}`;
//                 }

//                 // You can return any component that you like here! We usually use an
//                 // icon component from react-native-vector-icons
//                 return <Ionicons name={iconName} size={25} color={tintColor} />;
//             },
//         }),
//         tabBarComponent: TabBarTop,
//         tabBarPosition: 'top',
//         tabBarOptions: {
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//         },
//         animationEnabled: false,
//         swipeEnabled: false,
//     }
// )

// const BottomBarNavigator = createBottomTabNavigator({
//     LoginScreen,
//     RegisterScreen
// },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let iconName;
//                 if (routeName === 'Login') {
//                     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//                 } else if (routeName === 'Register') {
//                     iconName = `ios-add-circle${focused ? '' : '-outline'}`;
//                 }

//                 // You can return any component that you like here! We usually use an
//                 // icon component from react-native-vector-icons
//                 return <Ionicons name={iconName} size={25} color={tintColor} />;
//             },
//         }),
//         tabBarComponent: TabBarBottom,
//         tabBarPosition: 'bottom',
//         tabBarOptions: {
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//         },
//         animationEnabled: false,
//         swipeEnabled: false,
//     }
// )


const Drawer = createDrawerNavigator(
    {
        Home: { screen: Home },
        Calendar: { screen: Calendar },
        Map: { screen: MapScreen },
        Chat: { screen: Chat },
        Charts: { screen: Charts },
        Todos: { screen: Todos }
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