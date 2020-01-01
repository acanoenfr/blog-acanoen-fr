import React, {Component, Fragment} from 'react'
import marked from "marked";
import firebase from "firebase/app"
import 'firebase/auth'
import base, { firebaseApp } from "../base"
import ModArticle from "./ModArticle";

class Post extends Component {
    state = {
        post: {
            title: "",
            content: "",
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
        return (
            <div className="post">
                <h2 className="post-title">{this.state.post.title}</h2>
                <p className="post-meta">Posté le {(new Date(this.state.post.created_at)).toLocaleDateString()} par {this.state.post.author}</p>
                <div className="post-content" dangerouslySetInnerHTML={this.renderContent(this.state.post.content)}></div>
                {isLogged}
            </div>
        )
    }
}

export default Post
