import React from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import AppContainer from './routes/routes'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

