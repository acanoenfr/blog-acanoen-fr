import React, {Component} from 'react';

class AddArticle extends Component {
    state = {
        title: "",
        slug: "",
        content: ""
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        const post = this.state
        this.props.addPost(post)
        Object.keys(post).forEach(item => {
            post[item] = ''
        })
        this.setState({ ... post })
    }

    render() {
        return (
            <div className="card">
                <h2>Nouvel article</h2>
                <form className="admin-form add-article" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="title" placeholder="Titre de l'article" />
                    <input onChange={this.handleChange} type="text" name="slug" placeholder="Slug de l'article" />
                    <textarea onChange={this.handleChange} rows="15" name="content" placeholder="Contenu de l'article" />
                    <button type="submit">Publier l'article</button>
                </form>
            </div>
        );
    }
}

export default AddArticle;
