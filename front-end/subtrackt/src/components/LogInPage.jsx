import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";
import useToggle from "./use-toggle";
import Footer from "./Footer.jsx";
const LogInPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { fromt: { pathname: "/" } }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const showpass = useToggle();
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
                            type={showpass.val ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={handlePassword}
                            placeholder="Password"
                        />
                        Show Password: <input type="checkbox" onClick={showpass.trigger} />
                    </div>
                    <br />
                    {auth.errMessage ? <div>{auth.errMessage}</div> : null}
                    <button type="submit" className="custom-button" onClick={handleSubmit}>Submit</button>
                    <br/><br/>

                    <p className="signup_login_link">Don't have an account? <button className="button-link" onClick={props.handleChange}>Sign up</button></p><br/><br/>
                </form>
            </div>
            <Footer/>
            {auth.errMessage ? <div>{auth.errMessage}</div> : null}
        </div>

    );
};
export default LogInPage;
