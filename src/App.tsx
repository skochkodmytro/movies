import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import { Header } from './components/Header';

import { Movies } from './pages/Movies';
import { MovieItem } from './pages/MovieItem';
import { Favorites } from './pages/Favorites';

import './App.css';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Container className="App">
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Movies />} />
                        <Route path=":id" element={<MovieItem />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </Router>
            </Container>
        </>
    )
}

export default App;
