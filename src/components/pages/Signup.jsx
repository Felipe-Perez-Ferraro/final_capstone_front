import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserSignup } from '../../redux/usersession/usersessionsSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setFormError('Name field cannot be empty');
      return;
    }
    try {
      await dispatch(getUserSignup({ name })).unwrap();
      setName('');
      navigate('/login');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <section className="flex flex-col items-center gap-8 m-4 lg:w-full lg:h-screen lg:mt-[20%]">
      <h2 className="text-center text-2xl font-black uppercase mb-20">Sign up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col text-xl">
        <label htmlFor="name-input">
          Name:
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-black rounded-md ml-2 w-[70%]"
          />
        </label>
        {formError && <p className="text-red-500">{formError}</p>}
        <button type="submit" className="border-2 border-lime-400 bg-lime-400 rounded px-4 py-2 w-32 self-center my-10">Sign up</button>
      </form>
    </section>
  );
};

export default Signup;
