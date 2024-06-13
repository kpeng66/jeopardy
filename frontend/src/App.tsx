import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
