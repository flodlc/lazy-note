import React from 'react';

const PasswordContext = React.createContext<{
    password?: string;
    setPassword: (password?: string) => void;
}>({
    password: undefined,
    setPassword: () => {},
});

export default PasswordContext;
