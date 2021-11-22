import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import { StyledBadge } from './StyledBadge';

export const UserAvatar = (props: { name, i, showBadge? }) => (
    <Tooltip title={props.name}>
        {props.showBadge ?
            <StyledBadge className="me-1"
                         overlap="circular"
                         key={props.i}
                         anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                         variant="dot">
                <Avatar alt={props.name} src="/"/>
            </StyledBadge>
            : <Avatar alt={props.name} src="/"/>}
    </Tooltip>
);
