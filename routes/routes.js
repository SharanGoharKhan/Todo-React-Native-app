import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    TabBarBottom,
    TabBarTop
} from "react-navigation";
import Posts from '../components/posts'
import Counter from '../components/counter'
import LoginScreen from '../components/auth/loginScreen'
import RegisterScreen from '../components/auth/regScreen'
import Home from '../components/home/home'
import AuthLoading from '../ui/authLoading'
import Maps from '../components/maps/maps'


const TopBarNavigator = createMaterialTopTabNavigator({
    LoginScreen,
    RegisterScreen
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Login') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Register') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
)

const BottomBarNavigator = createBottomTabNavigator({
    LoginScreen,
    RegisterScreen
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Login') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Register') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
)


const Drawer = createDrawerNavigator(
    {
        Home,
        Counter,
        Posts,
        BottomBarNavigator,
        TopBarNavigator,
        Maps
    },
    {
        initialRouteName: 'Home'
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