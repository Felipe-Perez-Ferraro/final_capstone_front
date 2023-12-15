import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoat } from './../../redux/boats/boatsSlice';
import { selectUser } from '../../redux/usersession/usersessionsSlice';

const AddBoat = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
  
    const [boatData, setBoatData] = useState({
      name: '',
      description: '',
      price: 0,
      color: '',
      rent_price: 0,
      user_id: 1,
      picture: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBoatData({ ...boatData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createBoat(boatData));
      // Clear the form after submission
      setBoatData({
        name: '',
        description: '',
        price: 0,
        color: '',
        rent_price: 0,
        user_id: user.id,
        picture: ''
      });
    };
  
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add Boat</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={boatData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={boatData.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={boatData.price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={boatData.color}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rent Price</label>
            <input
              type="number"
              name="rent_price"
              value={boatData.rent_price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Picture</label>
            <input
              type="text"
              name="picture"
              value={boatData.picture}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddBoat;