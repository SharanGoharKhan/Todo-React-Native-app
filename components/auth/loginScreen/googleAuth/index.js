import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Button } from 'native-base';
import { connect } from 'react-redux'
import { googleAuth } from '../../../../store/actions/auth/login'
import styles from './styles'

class GoogleAuth extends Component {
    render() {
        return (
            <View>
                <Button
                  style={styles.googleAuthContainerButton}
                  block
                  danger
                  onPress={() => {
                    this.props.googleAuth()
                  }}>
                  <Image style={styles.googleAuthContainerImage} source={require('../../../../assets/googleAuthImage.png')} />
                  <Text style={styles.googleAuthContainerText}>Continue with Google</Text>
                </Button>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => ({
    googleAuth: () => {
        googleAuth().then(data => { dispatch(data) }).catch(err => console.log(err))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth)