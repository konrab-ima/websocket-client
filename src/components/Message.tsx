import React from 'react';
import './Message.scss';
import { UserAvatar } from './UserAvatar';
import { IMessage, MessageType } from '../types/message';

export const Message = (props: { msgData: IMessage, i }) => {
    switch (props.msgData.type) {
        case MessageType.INFO:
            return <small className="d-block my-2 text-center">- {props.msgData.msg} -</small>
        default:
            return <div className="message-wrapper" key={props.i}>
                <UserAvatar name={props.msgData.name} i={props.i}/>
                <div className="message">
                    <span>{props.msgData.msg}</span>
                    <small>{props.msgData.createdAt}</small>
                </div>
            </div>
    }
};
