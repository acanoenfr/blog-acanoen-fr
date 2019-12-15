import React, { Component } from 'react'
import './App.css'
import firebase from "firebase/app"
import 'firebase/auth'
import base, { firebaseApp } from "./base"
import Login from "./components/Login"

class App extends Component {
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
            <div className="App">
                <h1 className="title"><a href="/">Le Blog d'Alexandre</a></h1>
                <footer className="footer">
                    {isLogged}
                </footer>
            </div>
        )
    }
}

export default App
