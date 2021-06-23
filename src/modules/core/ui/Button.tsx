import styled from '@emotion/styled';

export const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 14px 20px;
    border-radius: 0;
    justify-content: center;
    transition: background-color 400ms;
    background-color: #34c3fe;
    border: none;
    color: white;
    font-weight: 400;
    box-shadow: 0 0 12px 0 #e4e4e4;
    letter-spacing: 0.04em;

    &:hover {
        background-color: rgba(52, 195, 254, 0.79);
    }
`;
