import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { selectUser } from '../../redux/usersession/usersessionsSlice';
import { createReservation } from '../../redux/reservations/reservationsSlice';

function Reserve() {
  const [boats, setBoats] = useState([]);
  const user = useSelector(selectUser);
  const [username, setUsername] = useState(user?.name);
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [boatId, setBoatId] = useState(undefined);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      createReservation({
        username,
        city,
        date,
        boat_id: boatId,
      }),
    );

    Swal.fire({
      icon: 'success',
      title: 'Boat Reserved Successfully',
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
    <>
      {user === null ? (
        <section className="h-full flex justify-center items-center">
          <article className="flex flex-col gap-4 border border-slate-950 rounded-md p-4">
            <h2 className="font-black uppercase text-4xl text-center">Acces Denied</h2>
            <p>Please Log In first so you can reserve a boat.</p>
          </article>
        </section>
      ) : (
        <section className="image h-full">
          <article className="h-full overlay lg:flex lg:flex-col lg:justify-center lg:items-center">
            <h2 className="text-white text-center text-2xl font-black lg:text-3xl uppercase py-6">
              Reserve a Boat Trip
            </h2>
            <p className="text-white font-semibold mb-3 text-center">
              Complete All fields to reserve a boat trip.
            </p>
            <article className="mx-auto max-w-xs sm:max-w-md lg:max-w-4xl py-6">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2 mb-6">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    required
                    className="border border-white p-1 text-lime-700 font-semibold rounded outline-none bg-white w-full lg:w-40"
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
                    className="border border-white p-1 text-lime-700 font-semibold rounded outline-none bg-white w-full lg:w-40"
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
                    className="border border-white p-1 text-lime-700 font-semibold rounded outline-none bg-white w-full lg:w-40"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                  <select
                    name="boatId"
                    value={boatId || ''}
                    className="border border-white p-1 text-lime-700 font-semibold rounded outline-none bg-white w-full lg:w-56"
                    required
                    onChange={(e) => {
                      setBoatId(parseInt(e.target.value, 10) || undefined);
                    }}
                  >
                    <option value="">Select a Boat</option>
                    {boats.data
                      ? boats.data.map((boat) => (
                        <option key={boat.id} value={boat.id}>
                          {boat.name}
                          {' '}
                          - Rent Price: $
                          {boat.rent_price}
                        </option>
                      ))
                      : 'Not load'}
                  </select>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-white rounded-lg py-2 px-6 bg-white font-bold text-lime-600 text-md hover:bg-orange-600 hover:border-orange-600 hover:text-white transition ease-in delay-75"
                  >
                    Reserve Now
                  </button>
                </div>
              </form>
            </article>
          </article>
        </section>
      )}
    </>
  );
}

export default Reserve;
