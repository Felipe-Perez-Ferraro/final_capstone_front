import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaGooglePlus } from 'react-icons/fa';
import {
  deleteBoat,
  fetchBoats,
  selectAllBoats,
} from '../../redux/boats/boatsSlice';

const Boats = () => {
  const dispatch = useDispatch();
  const boats = useSelector(selectAllBoats);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchBoats());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(boats)
    ? boats.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (id) => {
    dispatch(deleteBoat(id));
    dispatch(fetchBoats());
  };

  return (
    <section className="my-6 flex flex-col items-center lg:mb-20">
      <h2 className="text-center text-2xl font-black my-4 lg:text-3xl lg:my-10 uppercase">
        All Boat Models
      </h2>

      <h4 className="text-center">Please select one to Reserve</h4>

      <p className="text-gray-300 my-6">********************</p>

      {boats.length === 0 && (
        <>
          <h1 className="font-semibold text-2xl">
            There are no boats yet. Please create one.
          </h1>
        </>
      )}

      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-11 w-full">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
          className="font-bold text-2xl bg-lime-500 pl-10 pr-4 py-2 rounded-r-3xl text-white hidden lg:block lg:h-14 lg:self-center lg:col-span-1"
        >
          {'<'}
        </button>

        {boats.length > 0
          && currentItems.map((boat) => (
            <div key={boat.id} className="lg:col-span-3 p-12 lg:p-8">
              <Link to={`/boats/${boat.id}`} className="block">
                <img
                  src={boat.picture}
                  alt={boat.name}
                  className="object-contain rounded-md"
                />
              </Link>
              <h3 className="text-center text-xl font-bold my-4">
                {boat.name}
              </h3>
              <p className="text-gray-300 mb-4 text-center">
                ********************
              </p>
              <p className="text-center mb-6">{boat.description}</p>
              <div className="flex justify-center gap-x-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleClick(boat.id)}
                  className="bg-red-600 py-1 rounded w-16 text-center text-white font-semibold hover:bg-red-800"
                >
                  Delete
                </button>
                <Link
                  to="/reserve"
                  className="bg-orange-500 py-1 rounded w-16 text-center text-white font-semibold hover:bg-orange-600"
                >
                  Reserve
                </Link>
              </div>
              <div className="flex justify-center gap-10">
                <FaTwitter />
                <FaFacebook />
                <FaGooglePlus />
              </div>
            </div>
          ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(boats.length / itemsPerPage)}
          type="button"
          className="font-bold text-2xl bg-lime-500 pr-10 pl-4 py-2 rounded-l-3xl text-white hidden lg:block lg:h-14 lg:self-center lg:col-start-11"
        >
          {'>'}
        </button>
        <div className="flex justify-between lg:hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            className="font-bold text-2xl bg-lime-500 pl-10 pr-4 py-2 rounded-r-3xl text-white"
          >
            {'<'}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(boats.length / itemsPerPage)}
            type="button"
            className="font-bold text-2xl bg-lime-500 pr-10 pl-4 py-2 rounded-l-3xl text-white"
          >
            {'>'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Boats;
