import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import HomePage from './modules/note/views/HomePage/HomePage';
import { Flexbox } from './modules/core/ui/Container';
import { Route, Switch, useHistory } from 'react-router';
import PasswordContext from './modules/note/contexts/PasswordContext';
import Login from './modules/note/views/Login/Login';

const useLoginRedirect = (password?: string) => {
    const history = useHistory();
    useEffect(() => {
        if (!password) {
            history.push('/login');
        }
    }, [history, password]);
};

function App() {
    const [password, setPassword] = useState<string>();
    useLoginRedirect(password);

    return (
        <PasswordContext.Provider value={{ password, setPassword }}>
            <AppWrapper flex={1} column>
                <Switch>
                    <Route path={'/login'}>
                        <Login />
                    </Route>
                    <Route path={'/'}>
                        {password && (
                            <Switch>
                                <Route path={'/notes/:id'}>
                                    <HomePage />
                                </Route>
                                <Route path={'/'}>
                                    <HomePage />
                                </Route>
                            </Switch>
                        )}
                    </Route>
                </Switch>
            </AppWrapper>
        </PasswordContext.Provider>
    );
}

export default App;

const AppWrapper = styled(Flexbox)`
    height: 100vh;
    background-color: #f9f9f9;
    color: rgba(0, 0, 0, 0.85);
`;
