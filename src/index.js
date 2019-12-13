import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './index.css'
import App from './App'
import NotFound from "./components/errors/NotFound"
import * as serviceWorker from './serviceWorker'

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.register()
