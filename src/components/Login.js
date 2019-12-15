import React from 'react'

const Login = ({ authenticate }) => {
    return (
        <div className="Login">
            <h2>Connecte-toi pour intéragir !</h2>
            <button onClick={authenticate} className="google-btn">
                Me connecter avec Google
            </button>
        </div>
    )
}

export default Login
