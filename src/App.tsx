import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Chat } from './components/Chat';

function App() {
    return (
        <div className="container">
            <div className="card-wrapper">
                <Router>
                    <Routes>
                        <Route path="/chat" element={<Chat/>}/>
                        <Route path="/" element={<Login/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
