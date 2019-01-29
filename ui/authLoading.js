import React from 'react';
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native'
import { googleAuth } from '../store/actions/auth/login'

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    userToken ? this.props.googleAuth(JSON.parse(userToken)) : null
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Drawer' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.loginReducer.user
})
const mapDispatchToProps = (dispatch) => ({
  googleAuth: (result) => dispatch(googleAuth(result))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)