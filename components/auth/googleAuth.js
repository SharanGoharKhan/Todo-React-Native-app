import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { googleAuth } from '../../store/actions/auth/login'

class GoogleAuth extends Component {
    render() {
        return (
            <View>
                <Text>User data: {JSON.stringify(this.props.user)}</Text>
                <Button
                    onPress={() => {
                        this.props.googleAuth()
                    }}
                    title='Google'
                />
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