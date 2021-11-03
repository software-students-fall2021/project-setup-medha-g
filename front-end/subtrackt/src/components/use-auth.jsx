import React, {useState, useEffect, useContext, createContext} from 'react';

const authContext = createContext();

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const signin = (username, password, effect) => {
        setUser(username);
        if(effect) effect();
    }

    const signup = (username, password, effect) => {
        setUser(username);
        if(effect) effect();
    }

    const signout = (effect) => {
        setUser(false);
        if(effect) effect();
    }

    return {
        user, signin, signup, signout
    }
}