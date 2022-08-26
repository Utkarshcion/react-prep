import React from 'react';

const SignInContext = React.createContext({
    singInTime: Date.now(),
    username: '',
    token: '',
    setUHandler: (username) => {
        console.log('I am in this method !!');
    }
});

export default SignInContext;
