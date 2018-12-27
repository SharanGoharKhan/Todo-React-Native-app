import React from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import AppContainer from './routes/routes'
import { View, Text } from 'react-native'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({
      loading: false
    })
  }
  render() {
    if (this.state.loading) {
      return (<View>
        <Text>Loading...</Text>
      </View>)
    } else
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
  }
}

