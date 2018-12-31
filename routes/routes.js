import { createStackNavigator, createAppContainer, createDrawerNavigator,createSwitchNavigator } from "react-navigation";
import Posts from '../components/posts'
import Counter from '../components/counter'
import LoginScreen from '../components/auth/loginScreen'
import RegisterScreen from '../components/auth/regScreen'
import Home from '../components/home/home'
import AuthLoading from '../ui/authLoading'

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