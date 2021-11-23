import React from 'react';
import axios from "axios";
import { useAuth } from './use-auth';


const ParseTransactions = props => {
    const auth = useAuth();

    const handleParse = () => {
        console.log("parsing transaction")
        axios.get("/api/plaid/parse", {
            headers: {
                access_token: props.token,
                Authorization: `Token ${auth.jwt}`
            }
        }).then(res => {
            props.handleRender.update();
        }).catch(err => {
            if (err.status === 401) auth.signout();
            alert(`Failed to parse subscription: ${err.message}`);
        })
    }


    return (
        <button className="btn btn-primary" onClick={handleParse} >Parse Transactions</button>
    )
}

export default ParseTransactions;