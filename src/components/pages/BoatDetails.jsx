import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatDetails } from '../../redux/boatDetails/boatDetailsSlice';
import { selectUser } from '../../redux/usersession/usersessionsSlice';

const BoatDetails = () => {
  const boatDetailsState = useSelector((state) => state.boatDetails);
  const dispatch = useDispatch();
  const idBoat = useParams();
  const user = useSelector(selectUser);

  const boat = boatDetailsState.boatDetails;

  useEffect(() => {
    dispatch(getBoatDetails(idBoat.id));
  }, [dispatch]);

  return (
    <section className="h-full w-full flex flex-col justify-between">
      <div className="md flex p-5 justify-center  md:mb-18 lg:justify-end mr-6 ">
        <h1 className="text-3xl font-medium text-black-100 uppercase">
          {boat.name}
        </h1>
      </div>
      <div className="md:flex md:mt-30 ">
        <div className="imagen w-full p-1 rounded md:p-8 lg:h-full flex justify-center ">
          <img
            className="flex justify-center w-80 object-contain sm:object-fill md:w-4/5 rounded-full"
            src={boat.picture}
            alt="boat"
          />
        </div>
        <div className="boat-details-container h-3/5 md:h-full md:w-1/2 p-8 bg-white rounded-lg">
          {/* Description */}
          <div className="details-section flex justify-between items-center md:block mb-4 bg-gray-100 p-4 rounded">
            <h2 className="section-title text-lg font-bold text-gray-600">
              Description
            </h2>
            <p className="text-gray-500 ml-6 mt-2">{boat.description}</p>
          </div>

          {/* Color */}
          <div className="details-section flex justify-between items-center md:block mb-4 bg-gray-100 p-4 rounded">
            <h2 className="section-title text-lg font-bold text-gray-600">
              Color
            </h2>
            <p className="text-gray-500 ml-6 mt-2">{boat.color}</p>
          </div>

          {/* Rent per day */}
          <div className="details-section flex justify-between items-center md:block mb-4 bg-gray-100 p-4 rounded">
            <h2 className="section-title text-lg font-bold text-gray-600">
              Rent per day
            </h2>
            <p className="text-gray-500 ml-6 mt-2">
              $
              {boat.rent_price}
            </p>
          </div>

          {/* Full Purchase Price */}
          <div className="details-section flex justify-between items-center md:block mb-4 bg-gray-100 p-4 rounded">
            <h2 className="section-title text-lg font-bold text-gray-600">
              Full Purchase Price
            </h2>
            <p className="text-gray-500 ml-6 mt-2">
              $
              {boat.price}
            </p>
          </div>

          {/* Reserve Now button */}
          {user !== null && (
            <div className="reserve-btn flex justify-center pt-8">
              <a
                href="/reserve"
                className="font-semibold px-4 py-2 text-xl bg-lime-500 sm:px-8 sm:py-5 rounded-full text-gray-100 "
              >
                <span>Reserve</span>
                <span className="text-xl ml-4">&#10148;</span>
              </a>
            </div>
          )}
        </div>
      </div>
      <a
        type="button"
        href="/boats"
        className="font-bold w-20 text-3xl bg-lime-500 pl-10 pr-4 py-5 mb-4 rounded-r-3xl text-white flex justify-start "
      >
        {'<'}
      </a>
    </section>
  );
};

export default BoatDetails;
