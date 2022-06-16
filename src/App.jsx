import React, { useEffect, useState }  from 'react';
import { Routes, Route, Navigate, } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ClientPage from './pages/ClientPage';
import PhotographerPage from './pages/Photographer';
import PortfolioPage from './pages/PortfolioPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#c0ca33',
    },
    secondary: {
      main: '#039be5',
    },
    info: {
      main: '#388e3c'
    }
    
  },
});

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path='/' element={<ClientPage />}></Route>
        <Route path='/admin' element={<AdminPage />}></Route>
        <Route path='/portfolio' element={<PortfolioPage />}></Route>
        <Route path='/login' element={<SignIn />}></Route>
        <Route path='/registration' element={<SignUp />}></Route>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </ThemeProvider>
  ) 
}
