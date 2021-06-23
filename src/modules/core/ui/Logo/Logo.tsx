import styled from '@emotion/styled';
import LOGOS from './LOGO_SVG';
import * as React from 'react';
import { FunctionComponent } from 'react';

const Logo: FunctionComponent<{
    height?: number;
    inline?: boolean;
    name?: 'note' | 'logout';
    onClick?: () => void;
}> = ({ height = 20, inline = false, name = 'note', onClick = () => {} }) => {
    return (
        <LogoWrapper
            inline={inline}
            height={height}
            onClick={() => onClick()}
            dangerouslySetInnerHTML={{ __html: LOGOS[name] }}
        />
    );
};

export default React.memo(Logo);

const LogoWrapper = styled.div<{ height: number; inline: boolean }>`
    height: 100%;
    align-items: center;
    justify-content: center;
    display: ${({ inline }) => (inline ? 'inline' : 'flex')};

    svg {
        height: ${({ height }) => height}px;
    }
`;
