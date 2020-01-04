import React, {Component, Fragment} from 'react'
import marked from "marked"
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/storage'
import base, { firebaseApp } from "../base"
import ModArticle from "./ModArticle";

class Post extends Component {
    state = {
        post: {
            title: "",
            content: "",
            image: "",
            author: "",
            created_at: ""
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`/posts/${this.props.match.params.slug}`, {
            context: this,
            state: 'post'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    renderContent = text => {
        const __html = marked(text, { sanitize: true })
        return { __html }
    }

    render() {
        let isLogged = <Fragment />
        if (this.props.uid === "M0T1BsZIxLS0ZbdTKPcRtvVLtV03") {
            isLogged = (
                <ModArticle slug={this.props.match.params.slug} />
            )
        }
        firebaseApp.storage("gs://blog-acanoen-fr.appspot.com")
            .ref(`images/${this.state.post.image}`)
            .getDownloadURL()
            .then(url => this.imageUrl = url)
        return (
            <Fragment>
                <img className="post-image" src={`https://firebasestorage.googleapis.com/v0/b/blog-acanoen-fr.appspot.com/o/images%2F${this.state.post.image}?alt=media&token=2ab068ce-e435-4e0d-9bc2-d09602c1ee23`} alt={this.state.post.title} />
                <div className="post">
                    <h2 className="post-title">{this.state.post.title}</h2>
                    <p className="post-meta">Posté le {(new Date(this.state.post.created_at)).toLocaleDateString()} par {this.state.post.author}</p>
                    <div className="post-content" dangerouslySetInnerHTML={this.renderContent(this.state.post.content)}></div>
                </div>
                {isLogged}
            </Fragment>
        )
    }
}

export default Post
