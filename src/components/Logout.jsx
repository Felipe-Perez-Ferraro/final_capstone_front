import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logoutUser } from '../redux/usersession/usersessionsSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    Swal.fire({
      title: 'Logout Successful',
      text: 'You have successfully logged out',
      icon: 'success',
    });
  };

  return (
    <button type="button" onClick={handleLogout} className="uppercase">
      Logout
    </button>
  );
};

export default Logout;
