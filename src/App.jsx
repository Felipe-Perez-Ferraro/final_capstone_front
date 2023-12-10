import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Boats from './components/pages/Boats';
import BoatDetails from './components/pages/BoatDetails';
import Reservations from './components/pages/Reservations';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Boats />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="boats" element={<Boats />} />
        <Route path="boats/boatdetails" element={<BoatDetails />} />
        <Route path="reservations" element={<Reservations />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
