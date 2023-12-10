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
      console.log('Submitting form');
      console.log(`Name: ${name}`);
      await dispatch(getUserLogin({ name })).unwrap();
      setName('');
      navigate('/boats');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <section>
      <h2>Login</h2>

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
