import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserLogin, selectError } from '../../redux/usersession/usersessionsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const apiError = useSelector(selectError);
  const [formError, setFormError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setFormError('Name field cannot be empty');
      return;
    }
    console.log('Submitting form');
    dispatch(getUserLogin({ name }));
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
        {apiError && <p className="text-red-500">{apiError}</p>}
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
