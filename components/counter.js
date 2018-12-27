import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'
import { counterIncrement, counterDecrement, fetchPosts } from '../store/actions/counter'


class Counter extends Component {
    render() {
        return (
            <View style={{ margin: 50 }}>

                <Text>{JSON.stringify(this.props.user)}</Text>
                <Button
                    onPress={this.props.increment}
                    title='Increase count'
                />
                <Text>{this.props.count}</Text>
                <Button
                    onPress={() => { this.props.decrement('adnan'); this.props.fetchPosts() }}
                    title='Decrease count'
                />
                <Button
                    onPress={() => { this.props.navigation.navigate('Posts') }}
                    title='Posts' />
                <Button
                    onPress={() => { this.props.navigation.navigate('Login') }}
                    title='Login' />
                
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.counterReducer.count,
    data: state.counterReducer.data,
    posts: state.counterReducer.posts,
    user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => ({
    increment: () => {
        dispatch(counterIncrement)
    },
    decrement: (data) => {
        dispatch(counterDecrement(data))
    },
    fetchPosts: () => {
        fetchPosts().then(data => { dispatch(data) }).catch(err => console.log(err))

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

