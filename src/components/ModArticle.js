import React, { Component } from 'react'
import firebase from "firebase/app"
import 'firebase/auth'
import base, { firebaseApp } from "../base"

class ModArticle extends Component {
    state = {
        post: {
            title: "",
            slug: "",
            content: ""
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.ref = base.syncState(`/posts/${this.props.slug}`, {
            context: this,
            state: 'post'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    handleChange = event => {
        const { name, value } = event.target
        const { post } = this.state
        post[name] = value
        this.setState({ post })
    }

    render() {
        return (
            <div className="card">
                <h2>Edition article</h2>
                <form className="admin-form add-article">
                    <input onChange={this.handleChange} value={this.state.post.title} type="text" name="title" placeholder="Titre de l'article" />
                    <input type="text" name="slug" value={this.props.slug} placeholder="Slug de l'article" readOnly />
                    <textarea onChange={this.handleChange} value={this.state.post.content} rows="15" name="content" placeholder="Contenu de l'article" />
                </form>
            </div>
        )
    }
}

export default ModArticle
