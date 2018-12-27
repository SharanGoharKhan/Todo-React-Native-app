import Actions from './actionTypes'

export const counterIncrement = {
    type: Actions.COUNTER_INCREMENT
}

export const counterDecrement = (data) => ({
    type: Actions.COUNTER_DECREMENT,
    payload: data
})

export const fetchPosts = () => {
    // return fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then(res => res.json())
    //     .then(posts => ({
    //         type: Actions.FETCH_POSTS,
    //         payload: posts
    //     }))
    return fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', headers: { 'content-type': 'application/json', body: { 'title': 'title', 'body': 'body' } } })
        .then(res => res.json())
        .then(posts => ({
            type: Actions.FETCH_POSTS,
            payload: posts
        }))
        .catch(err => console.log(err))
}