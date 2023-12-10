import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSignup, selectError } from '../../redux/usersession/usersessionsSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [formError, setFormError] = useState(null);
  const apiError = useSelector(selectError);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setFormError('Name field cannot be empty');
      return;
    }
    dispatch(getUserSignup({ name }));
  };

  return (
    <section>
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">
          Name:
          <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {formError && <p className="text-red-500">{formError}</p>}
        {apiError && <p>{apiError}</p>}
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
};

export default Signup;
