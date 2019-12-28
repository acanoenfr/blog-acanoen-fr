import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
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
            author: this.props.name.split(' ')[0],
            created_at: Date.now()
        }
        this.setState({ posts })
    }

    delPost = key => {
        const { posts } = this.state
        if (window.confirm("Êtes-vous sûr de supprimer cet article ?")){
            posts[key] = null
            this.setState({ posts })
        }
    }

    render() {
        let isLogged = <Fragment />
        if (this.props.uid === "M0T1BsZIxLS0ZbdTKPcRtvVLtV03") {
            isLogged = (
                <Fragment>
                    <AddArticle addPost={this.addPost} />
                </Fragment>
            )
        }
        const cards = Object.keys(this.state.posts)
            .map(key => (
                <div className="posts-one">
                    <h2 className="post-title">{this.state.posts[key].title}</h2>
                    <p className="post-meta">Posté le {(new Date(this.state.posts[key].created_at)).toLocaleString()} par {this.state.posts[key].author}</p>
                    <Link to={`/${key}`}>Lire l'article</Link> {this.props.uid === "M0T1BsZIxLS0ZbdTKPcRtvVLtV03" ? <button className="del-post" onClick={() => this.delPost(key)}>Supprimer</button> : ""}
                </div>
            ))
        return (
            <div className="App">
                <div className="posts">
                    {cards}
                </div>
                {isLogged}
            </div>
        )
    }
}

export default App
