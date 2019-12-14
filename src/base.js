import Rebase from "re-base"
import firebase from "firebase"
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCz54yShbY7gmidq3DOnXyrJXaXRvaZ0JE",
    authDomain: "blog-acanoen-fr.firebaseapp.com",
    databaseURL: "https://blog-acanoen-fr.firebaseio.com",
    projectId: "blog-acanoen-fr",
    storageBucket: "blog-acanoen-fr.appspot.com",
    messagingSenderId: "340030609245",
    appId: "1:340030609245:web:717b2d6480e333d5f33ab4",
    measurementId: "G-1CGQ6JJ20M"
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
