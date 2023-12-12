import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaGooglePlus } from 'react-icons/fa';
import { fetchBoats, selectAllBoats } from '../../redux/boats/boatsSlice';

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
  const currentItems = Array.isArray(boats) ? boats.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mx-4 my-6 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold my-4">All Boat Models</h2>

      <h4 className="text-center mb-4">Please select one to Reserve</h4>

      <div className="flex flex-col gap-10 p-2">
        {currentItems.map((boat) => (
          <div key={boat.id}>
            <Link to={`/boats/${boat.id}`} className="block">
              <img src={boat.picture} alt={boat.name} className="object-contain rounded-md" />
            </Link>
            <h3 className="text-center text-xl font-bold my-4">{boat.name}</h3>
            <p className="text-center mb-4">{boat.description}</p>
            <div className="flex justify-center gap-10">
              <FaTwitter />
              <FaFacebook />
              <FaGooglePlus />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
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
