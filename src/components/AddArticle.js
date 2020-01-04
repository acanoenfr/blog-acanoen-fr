import React, {Component} from 'react';

class AddArticle extends Component {
    state = {
        title: "",
        slug: "",
        content: "",
        image: {}
    }

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleChange = async event => {
        let { name, value } = event.target
        if (name === "image") {
            value = this.fileInput.current.files[0]
        }
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
                    <input ref={this.fileInput} onChange={this.handleChange} type="file" name="image" placeholder="Image de l'article" />
                    <button type="submit">Publier l'article</button>
                </form>
            </div>
        );
    }
}

export default AddArticle;
