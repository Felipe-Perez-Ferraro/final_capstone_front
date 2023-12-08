import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Boats from './components/Boats/Boats';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Boats />} />
      </Route>
    </Routes>
  </Router>
);

// Should this reflect of the back-end like user/boats/reservations?
// or /boats, /boats/boatdetails, /reservations?
// will handle that later I think

export default App;
