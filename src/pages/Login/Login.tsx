import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatIcon from '@mui/icons-material/Chat';

const Login = () => {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    };

    function submit(event) {
        event.preventDefault();
        localStorage.setItem('name', name);
        navigate('/spiel');
    }

    function goToChat(event) {
        event.preventDefault();
        localStorage.setItem('name', name);
        navigate('/chat');
    }

    return (
        <Card variant="outlined" className="shadow">
            <CardHeader title="Willkommen!"/>
            <CardContent className="d-flex">
                <form onSubmit={submit} className="full-width">
                    <TextField fullWidth required label="Name"
                               className="mb-2" value={name}
                               onChange={handleChange} variant="outlined"/>
                    <div className="d-flex full-width">
                        <Button size="large" onClick={goToChat}
                                className="me-2"
                                variant="contained" endIcon={<ChatIcon/>}
                                disabled={!name} type="button">Chatten</Button>
                        <Button size="large"
                                variant="contained" endIcon={<InsertEmoticonIcon/>}
                                disabled={!name} type="submit">Spielen</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default Login;
