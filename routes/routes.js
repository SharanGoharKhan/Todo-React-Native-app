import { createStackNavigator, createAppContainer, createDrawerNavigator,createSwitchNavigator } from "react-navigation";
import Posts from '../components/posts'
import Counter from '../components/counter'
import Login from '../components/auth/index'
import Register from '../components/auth/register'
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
        Login,
        Register
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