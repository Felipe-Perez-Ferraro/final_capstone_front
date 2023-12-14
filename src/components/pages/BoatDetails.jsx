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
    <div class="detail-container p-4">
    <h1 class="text-2xl font-bold mb-4">{boat.name}</h1>
    <div class="main-info flex flex-col md:flex-row items-center">
        <img class="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4" src={boat.picture} alt="boat"/>
        <div class="md:w-1/2">
            <div class="finance mb-4">
                <p class="mb-2">$400 deposit upon any Vespa Purchase!</p>
                <div class="mb-4">
                    <table class="table-auto">
                        <tr>
                            <td class="pr-4">Finance fee</td>
                            <td>${129}</td>
                        </tr>
                        <tr>
                            <td class="pr-4">Option to purchase fee</td>
                            <td>${249}</td>
                        </tr>
                        <tr>
                            <td class="pr-4">Total amount payable</td>
                            <td>${9879}</td>
                        </tr>
                        <tr>
                            <td class="pr-4">Duration</td>
                            <td>48 Months</td>
                        </tr>
                    </table>
                </div>
                <p class="mb-2">5.9% APR Representative</p>
                <button class="bg-blue-500 text-white px-4 py-2 rounded">Buy it</button>
            </div>
            <div class="reserve">
                <p class="mb-2">Reserve for $99</p>
                <p class="mb-2">Reserve this boat for just $350. We will call you to arrange the rest!</p>
                <button class="bg-green-500 text-white px-4 py-2 rounded">Reserve</button>
            </div>
        </div>
    </div>
    <button class="bg-gray-500 text-white px-4 py-2 rounded self-end">Back</button>
</div>

  );
}

export default BoatDetails;

