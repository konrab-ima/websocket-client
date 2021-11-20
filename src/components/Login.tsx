import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';

export function Login() {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    };

    function submit(event) {
        console.log(event);
        event.preventDefault();
        localStorage.setItem('name', name);
        navigate('/chat', {replace: true})
    }

    return (
        <Card variant="outlined">
            <CardHeader title="Willkommen!" />
            <CardContent>
                <form>
                    <TextField fullWidth required label="Name"
                               value={name}
                               onChange={handleChange} variant="outlined"/>
                </form>
            </CardContent>
            <CardActions>
                <Button onClick={submit} disabled={!name}>Submit</Button>
            </CardActions>
        </Card>
    );
}
