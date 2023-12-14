import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { getBoatDetails } from '../../redux/boatDetails/boatDetailsSlice';
import { useEffect } from 'react';


const BoatDetails = () => {
  const boatDetailsState = useSelector((state) => state.boatDetails);
  const dispatch = useDispatch();
  const idBoat = useParams();

  console.log("Estado de boatDetails:", boatDetailsState);
  const boat = boatDetailsState.boatDetails;

  useEffect(() => {
    dispatch(getBoatDetails(idBoat.id));
  }, [dispatch]);


  return (
    <div>
      <h1>Boat Details</h1>
      <div>
        <h2>{boat.name}</h2>
        <p>{boat.description}</p>
        <p>{boat.price}</p>
        <p>{boat.city}</p>
        <img src={boat.picture} alt="boat" />
      </div>
    </div>
  );
}

export default BoatDetails;

