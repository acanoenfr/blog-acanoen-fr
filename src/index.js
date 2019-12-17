import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './index.css'
import App from './App'
import NotFound from "./components/errors/NotFound"
import * as serviceWorker from './serviceWorker'
import firebase from "firebase";
import {firebaseApp} from "./base";
import Login from "./components/Login";
import Post from "./components/Post";

class Root extends Component {
    state = {
        uid: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        this.setState({
            uid: authData.user.uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth.GoogleAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async () => {
        await firebase.auth().signOut()
        this.setState({
            uid: null
        })
    }

    render() {
        let isLogged = (
            <div className="Login">
                <button className="logout-btn" onClick={this.logout}>Me déconnecter</button>
            </div>
        )
        if (!this.state.uid) {
            isLogged = <Login authenticate={this.authenticate} />
        }
        return (
            <main>
                <h1 className="title"><a href="/">Le Blog d'Alexandre</a></h1>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <App uid={this.state.uid} />
                        </Route>
                        <Route path='/:slug' component={Post} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
                <footer className="footer">
                    {isLogged}
                </footer>
            </main>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.register()
