import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Boats from './components/pages/Boats';
import BoatDetails from './components/pages/BoatDetails';
import MyReservations from './components/pages/MyReservations';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Reserve from './components/pages/Reserve';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/boats" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="boats" element={<Boats />} />
        <Route path="boats/boatdetails" element={<BoatDetails />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="my-reservations" element={<MyReservations />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
