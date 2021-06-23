import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Flexbox } from '../../../core/ui/Container';
import { getFormattedDate } from '../../../core/utils/date';

const Note: FunctionComponent<{
    title?: string;
    date?: string;
    onClick?: () => void;
    onDelete?: () => void;
}> = ({ title = 'sdf', date, onDelete = () => {} }) => {
    return (
        <NoteWrapper>
            <InfoWrapper column flex={1}>
                <NoteTitle>{title}</NoteTitle>
                {date && <NoteDate>{getFormattedDate(date)}</NoteDate>}
            </InfoWrapper>
            <Trash onClick={() => onDelete()} align="center" justify="center">
                🗑
            </Trash>
        </NoteWrapper>
    );
};

export default React.memo(Note);

const NoteWrapper = styled.div`
    background: white;
    cursor: pointer;
    padding: 25px 20px;
    box-shadow: 0 0 12px 0 #e4e4e4;
    display: flex;
`;

const NoteTitle = styled.div`
    font-size: 17px;
    letter-spacing: 0.6px;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
`;

const NoteDate = styled.div`
    font-size: 12px;
    color: grey;
`;

const InfoWrapper = styled(Flexbox)`
    min-width: 0;
    padding-right: 20px;
`;

const Trash = styled(Flexbox)`
    padding: 14px;
    overflow: hidden;
    border-radius: 100px;
    align-self: center;
    transition: background-color 300ms;

    &:hover {
        background-color: #f2f2f2;
    }
`;
