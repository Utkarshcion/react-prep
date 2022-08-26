import React, { useState } from 'react';
import SignInContext from './SignInContext';

const ContextProvider = (props) => {
    //get default
    const eUsername = localStorage.getItem('username');
    console.log('Context Provider Comp:', eUsername);
    const [username, SetUsername] = useState(eUsername !== null ? eUsername : 'Guest');

    const usernameHandler = (loggedInUsername) => {
        console.log('Setting up username', loggedInUsername);
        SetUsername(loggedInUsername);
    };

    const ctx = {
        singInTime: Date.now(),
        username: username,
        token: '',
        setUHandler: usernameHandler
    };

    return <SignInContext.Provider value={ctx}>{props.children}</SignInContext.Provider>;
};

export default ContextProvider;
