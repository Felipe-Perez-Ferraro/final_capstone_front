import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/usersession/usersessionsSlice';


const BoatDetails = () => {

  const user2 = useSelector(selectUser);

  console.log("El usuario es: ", user2.id);
  // const user = JSON.parse(localStorage.getItem('user'));

  // console.log("El usuario es: ", user.id);

  const idBoat = useParams();

  console.log("El id del barco es: ", idBoat.id);

  return (
    <div>
      <h1>BoatDetails</h1>
    </div>
  );
}

export default BoatDetails;
