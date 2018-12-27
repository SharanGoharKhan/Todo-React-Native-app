import React, { Component } from 'react'
import { View, Button,Text } from 'react-native'
import { connect } from 'react-redux'
import { fetchPosts } from '../store/actions/counter'


class Posts extends Component {
    render() {
        return (
            <View style={{margin:50}}>
                <Text>{JSON.stringify(this.props.posts)}</Text>
                <Button
                    onPress={() => {this.props.fetchPosts()}}
                    title='Press me'
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    posts: state.counterReducer.posts
})

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => {
        fetchPosts().then(data => { dispatch(data) }).catch(err => console.log(err))

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Posts)

