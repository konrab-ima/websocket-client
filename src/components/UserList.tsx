import React from 'react';
import { UserAvatar } from './UserAvatar';

export const UserList = (props: {users}) => (
    <div className="mb-2">
        {
            props.users.map((name, i) =>
                <UserAvatar key={i} name={name} i={i} showBadge={true}/>
            )
        }
    </div>
);
