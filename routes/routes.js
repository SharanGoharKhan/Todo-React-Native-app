import { createStackNavigator, createAppContainer, createDrawerNavigator,createSwitchNavigator } from "react-navigation";
import Posts from '../components/posts'
import Counter from '../components/counter'
// import Login from '../components/auth/index'
import LoginScreen from '../components/auth/loginScreen'
// import Register from '../components/auth/register'
import RegisterScreen from '../components/auth/regScreen'
import Home from '../components/home/home'
import AuthLoading from '../components/auth/authLoading'

const Drawer = createDrawerNavigator(
    {
        Home,
        Counter,
        Posts
    },
    {
        initialRouteName: 'Home'
    })
const authenticationNavigator = createStackNavigator(
    {
        LoginScreen,
        RegisterScreen
    },{
        headerMode:'none'
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