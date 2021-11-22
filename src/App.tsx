import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import Game from './pages/Game/Game';

function App() {
    return (
        <div className="container">
            <div className="card-wrapper">
                <Router>
                    <Routes>
                        <Route path="/chat" element={<PrivateRoute element={<Chat/>}/>}/>
                        <Route path="/spiel" element={<PrivateRoute element={<Game/>}/>}/>
                        <Route path="/" element={<Login/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
