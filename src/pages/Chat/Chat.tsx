import React, { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import './Chat.scss';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { UserList } from '../../components/UserList';
import { Message } from '../../components/Message';
import SendIcon from '@mui/icons-material/Send';
import { IMessage } from '../../types/message';
import { useNavigate } from 'react-router';

const ENDPOINT = 'https://aim-websocket-server.herokuapp.com/';

let socket: Socket;

const Chat = () => {
    const navigate = useNavigate();

    const [msg, setMsg] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const list = useRef<any>(null);

    useEffect(() => {
        const name = localStorage.getItem('name');
        socket = io(ENDPOINT, {query: {name}});

        socket.on('message', msg => {
            setMessages(m => [...m, msg]);
        })

        socket.on('userUpdate', (u) => {
            setUsers(u);
        });

        socket.on('info', (msg) => {
            setMessages(m => [...m, msg]);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            list.current?.lastElementChild?.scrollIntoView();
        }, 100);
    }, [messages]);

    const handleChange = (event) => {
        event.preventDefault();
        setMsg(event.target.value);
    };

    const sendMessage = (event) => {
        event.preventDefault();
        socket.send(msg);
        setMsg('');
    }

    const leaveChat = () => {
        socket.close();
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <UserList users={users}/>
            <div className="chat-wrapper">
                <Card variant="outlined" className="chat interactive-card shadow">
                    <CardContent ref={list}>
                        {messages.map((msgData: IMessage, i) =>
                            <Message key={i} msgData={msgData} i={i}/>
                        )}
                    </CardContent>
                    <CardActions>
                        <CardActions className="bottom-actions">
                            <form onSubmit={sendMessage} className="flex-form">
                                <TextField fullWidth required label="Nachricht"
                                           value={msg} className="me-2"
                                           onChange={handleChange} variant="outlined"/>
                                <Button size="large" variant="contained" endIcon={<SendIcon/>}
                                        disabled={!msg} type="submit">Senden</Button>
                            </form>
                        </CardActions>
                    </CardActions>
                </Card>
                <small onClick={leaveChat}
                       className="cursor-pointer d-block mt-2 text-center text-decoration-underline">Chat
                    verlassen</small>
            </div>
        </>
    );
}

export default Chat;
