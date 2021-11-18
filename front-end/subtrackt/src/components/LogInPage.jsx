import React, { useState } from "react";
import {useHistory, useLocation, Link} from "react-router-dom";
import { useAuth } from "./use-auth";

const LogInPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from} = location.state || {fromt : {pathname:"/"}}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handlers ==================================================================================================
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = e => {
        // prevent the HTML form from actually submitting 
        e.preventDefault();
        auth.signin(username, password, history.replace(from));
    }

    return (
        <div className="Login">
            <div>
            <form className="custom-form">
                <label>Log In:</label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={handleUsername}
                        placeholder="Username"
                    />
                </div>
                <br />
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                    />
                </div>
                <br />
                <button type="submit" className="custom-button" onClick={handleSubmit}>Submit</button>
                <button className="custom-button" onClick={props.handleChange}>Signup</button>
            </form>
            </div>
            {auth.errMessage ? <div>{auth.errMessage}</div> : null}
        </div>

    );
};

export default LogInPage;