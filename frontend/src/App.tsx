import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
