import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm';
import InfoPage from './Pages/InfoPage';


const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="info" element={<InfoPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;