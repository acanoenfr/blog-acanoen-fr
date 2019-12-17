import React, { Component, Fragment } from 'react'
import './App.css'
import firebase from "firebase/app"
import 'firebase/auth'
import base, { firebaseApp } from "./base"
import Login from "./components/Login"
import AddArticle from "./components/AddArticle"

class App extends Component {
    state = {
        posts: {}
    }

    componentDidMount() {
        this.ref = base.syncState('/posts', {
            context: this,
            state: 'posts'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    addPost = post => {
        const { posts } = this.state
        posts[post.slug] = {
            title: post.title,
            content: post.content,
            created_at: Date.now()
        }
        this.setState({ posts })
    }

    render() {
        let isLogged = <Fragment />
        if (this.props.uid) {
            isLogged = (
                <Fragment>
                    <AddArticle addPost={this.addPost} />
                </Fragment>
            )
        }
        return (
            <div className="App">
                {isLogged}
            </div>
        )
    }
}

export default App
