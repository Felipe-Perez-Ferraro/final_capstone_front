import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserLogin } from '../../redux/usersession/usersessionsSlice';

const Login = () => {
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
      await dispatch(getUserLogin({ name })).unwrap();
      setName('');
      navigate('/boats');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <section className="flex flex-col items-center gap-6">
      <h2 className="text-center text-xl font-bold">Login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">
          Name:
          <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {formError && <p className="text-red-500">{formError}</p>}
        <button type="submit">Login</button>
      </form>

      <h4>
        Don&apos;t have an account yet?
        {' '}
        <Link to="/signup">Please sign-up</Link>
      </h4>
    </section>
  );
};

export default Login;
