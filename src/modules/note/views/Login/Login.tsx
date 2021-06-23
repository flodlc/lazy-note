import { FormEvent, FunctionComponent, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../core/ui/Button';
import PasswordContext from '../../contexts/PasswordContext';
import { useHistory } from 'react-router';
import securityService from '../../services/security.service';

const Login: FunctionComponent = () => {
    const [hasSession, setHasSession] = useState<boolean | undefined>(
        securityService.hasSession()
    );
    const [inputPassword, setInputPassword] = useState('');
    const { setPassword } = useContext(PasswordContext);
    const history = useHistory();

    const resetApp = () => {
        securityService.clearSession();
        setHasSession(false);
    };

    const login = () => {
        if (hasSession) {
            if (securityService.checkPassword(inputPassword)) {
                setPassword(inputPassword);
                history.push('/');
            } else {
                alert('Mauvais mot de passe.');
            }
        } else {
            setPassword(inputPassword);
            securityService.saveCheckSequence(inputPassword);
            history.push('/');
        }
    };

    return (
        <LoginWrapper>
            {hasSession ? (
                <BlockWrapper>
                    <Help>
                        Entrez votre mot de passe choisi lors de la précédente
                        session pour retrouver vos notes.
                    </Help>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        <Input
                            required
                            type="password"
                            placeholder="Mot de passe"
                            onInput={(e: FormEvent<HTMLInputElement>) =>
                                setInputPassword(e.currentTarget.value)
                            }
                        />
                        <Button>Valider</Button>
                    </Form>
                    <Help style={{ marginTop: '30px' }}>
                        Si vous souhaitez tout effacer et recommencer une
                        session, cliquez sur Reset.
                    </Help>
                    <Reset onClick={resetApp}>Reset</Reset>
                </BlockWrapper>
            ) : (
                <BlockWrapper>
                    <Help>
                        Choisissez un mot de passe pour accéder à l'application
                        et ne l'oubliez pas.
                    </Help>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        <Input
                            required
                            type="password"
                            placeholder="Mot de passe"
                            onInput={(e: FormEvent<HTMLInputElement>) =>
                                setInputPassword(e.currentTarget.value)
                            }
                        />
                        <Button>Valider</Button>
                    </Form>
                </BlockWrapper>
            )}
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
`;

const Help = styled.div`
    color: grey;
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
`;

const Reset = styled.a`
    color: grey;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    align-self: center;

    &:hover {
        text-decoration: underline;
    }
`;

const Input = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #d9d9d9;
`;

const BlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    background-color: white;
    padding: 40px;
    box-shadow: 0 0 12px 0 #e4e4e4;
`;
