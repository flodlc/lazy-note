import styled from '@emotion/styled';

export const Container = styled.div<{ 'flex-1'?: boolean }>`
    padding: 20px 20px;
    width: 100%;
    box-sizing: border-box;
    flex: ${({ 'flex-1': flex1 }) => (flex1 ? '1' : '')};

    @media (max-width: 900px) {
        padding: 20px 15px;
    }
`;

export const Flexbox = styled.div<{
    column?: boolean;
    flex?: number;
    justify?: string;
    align?: string;
}>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${({ column }) => (column ? 'column' : 'row')};
    flex: ${({ flex }) => flex || ''};
    justify-content: ${({ justify }) => justify || ''};
    align-items: ${({ align }) => align || ''};
`;
