import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { selectUser } from '../../redux/usersession/usersessionsSlice';
import { createReservation } from '../../redux/reservations/reservationsSlice';

function Reserve() {
  const [boats, setBoats] = useState([]);
  const user = useSelector(selectUser);
  const [username, setUsername] = useState(user.name);
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [boat_id, setBoatId] = useState(undefined);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      createReservation({
        username,
        city,
        date,
        boat_id,
      }),
    );

    Swal.fire({
      icon: 'success',
      title: 'Boat Created Successfully',
      text: 'Your reservation has been successfully created.',
    });

    setUsername('');
    setCity('');
    setDate('');
    setBoatId(undefined);
  };

  useEffect(() => {
    const fetchBoats = async () => {
      const response = await fetch('http://127.0.0.1:3001/api/v1/boats/');
      const result = await response.json();
      setBoats(result);
    };
    fetchBoats();
  }, []);

  return (
    <section className="h-full lg:flex lg:justify-center lg:items-center bg-green-700 py-7">
      <article className="overlay mx-auto max-w-xs sm:max-w-md lg:max-w-4xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2 mb-6">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              required
              className="border border-slate-200 p-1 text-slate-600 font-semibold rounded outline-none"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              name="city"
              value={city}
              placeholder="City"
              required
              className="border border-slate-200 p-1 text-slate-600 font-semibold rounded outline-none"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <input
              type="date"
              name="date"
              value={date}
              placeholder=""
              required
              className="border border-slate-200 p-1 text-slate-600 font-semibold rounded outline-none"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <select
              name="boatId"
              value={boat_id || ''}
              className="border border-slate-200 p-1 text-slate-600 font-semibold rounded outline-none"
              required
              onChange={(e) => {
                setBoatId(parseInt(e.target.value, 10) || undefined);
              }}
            >
              <option value="">Select a Boat</option>
              {boats.map((boat) => (
                <option key={boat.id} value={boat.id}>
                  {boat.name}
                  {' '}
                  - Rent Price:
                  {' '}
                  $
                  {boat.rent_price}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="border-white rounded py-1 px-2 bg-orange-500 font-bold text-white text-lg">Reserve Now</button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Reserve;
