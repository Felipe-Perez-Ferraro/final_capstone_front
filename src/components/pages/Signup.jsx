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
      console.log('Submitting form');
      console.log(`Name: ${name}`);
      await dispatch(getUserSignup({ name })).unwrap();
      setName('');
      navigate('/login');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <section className="flex flex-col items-center gap-6">
      <h2 className="text-center text-xl font-bold">Sign up</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">
          Name:
          <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {formError && <p className="text-red-500">{formError}</p>}
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
};

export default Signup;
