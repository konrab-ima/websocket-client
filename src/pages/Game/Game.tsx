import React, { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import './Game.scss';
import { Button, Card, CardActions, CardMedia, Snackbar, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ENDPOINT = 'https://aim-websocket-server.herokuapp.com/';

let socket: Socket;

const Game = () => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [gameRunning, setGameRunning] = React.useState(false);
    const [guess, setGuess] = React.useState('');
    const [showGuess, setShowGuess] = React.useState(false);
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [answer, setAnswer] = React.useState('');

    useEffect(() => {
        const name = localStorage.getItem('name');
        socket = io(ENDPOINT, {query: {name}});

        socket.on('newGame', (imageUrl) => {
            setGameRunning(false);
            setImageUrl('');
            setTimeout(() => {
                setGameRunning(true);
            }, 100);
            setTimeout(() => {
                setImageUrl(imageUrl);
            }, 1000);
        });

        socket.on('guess', guess => {
            setShowGuess(true);
            setCurrentGuess(guess);
        })

        socket.on('winner', ({name, guessWord}) => {
            setShowAnswer(true);
            setAnswer(`${name}: ${guessWord}`);
            setGameRunning(false);
        });
    }, []);

    const handleChange = (event) => {
        event.preventDefault();
        setGuess(event.target.value);
    };

    const sendGuess = (event) => {
        event.preventDefault();
        socket.emit('guess', guess);
        setGuess('');
    }

    const handleCloseGuess = () => {
        setShowGuess(false);
        setCurrentGuess('');
    }

    const handleCloseAnswer = () => {
        setShowAnswer(false);
        setAnswer('');
    }

    return (
        <>
            <div className="game-wrapper">
                <Card variant="outlined" className="interactive-card shadow">
                    <CardMedia component="img"
                               className={gameRunning ? 'guess-image' : ''}
                               height="400"
                               image={imageUrl}/>
                    <CardActions>
                        <CardActions className="bottom-actions">
                            <form onSubmit={sendGuess} className="flex-form">
                                <TextField fullWidth required label="Antwort (nur 1 Wort)"
                                           value={guess} className="me-2"
                                           onChange={handleChange} variant="outlined"/>
                                <Button size="large" variant="contained" endIcon={<SendIcon/>}
                                        disabled={!guess || !gameRunning} type="submit">Senden</Button>
                            </form>
                        </CardActions>
                    </CardActions>
                </Card>
            </div>
            <Snackbar open={showGuess}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      autoHideDuration={3000}
                      onClose={handleCloseGuess}
                      message={currentGuess}/>

            <Snackbar open={showAnswer} color='success'
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      autoHideDuration={5000}
                      onClose={handleCloseAnswer}
                      message={answer}/>
        </>
    );
}

export default Game;
