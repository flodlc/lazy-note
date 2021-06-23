import { FunctionComponent, useContext } from 'react';
import { Title } from '../../../core/ui/Typo';
import { Button } from '../../../core/ui/Button';
import React from 'react';
import styled from '@emotion/styled';
import Logo from '../../../core/ui/Logo/Logo';
import PasswordContext from '../../contexts/PasswordContext';

const Header: FunctionComponent<{
    title: any;
    count?: number;
    action: { label: string; onClick: () => void };
}> = ({ title, count, action }) => {
    const { setPassword } = useContext(PasswordContext);

    const logout = () => {
        setPassword(undefined);
    };

    return (
        <TitleWrapper>
            <Title style={{ marginRight: 'auto' }}>
                <Logo inline height={20} /> Mes notes <small>({count})</small>
            </Title>
            {action && <Button onClick={action.onClick}>Nouvelle note</Button>}
            <Logout>
                <Logo onClick={() => logout()} name="logout" height={22} />
            </Logout>
        </TitleWrapper>
    );
};

export default Header;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #34c3fe;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

const Logout = styled.div`
    cursor: pointer;
    margin-left: 20px;
    padding: 10px;
`;
