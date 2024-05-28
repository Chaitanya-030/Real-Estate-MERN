import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({}); // initial values are given inside the useState
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,  /* whosoever is changed, set that in the formdata without changing the other values, id is mentioned in the html, those id will be used */ 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true); // the first thing is to set the loading --> true :)
      dispatch(signInStart);

      const res = await fetch('/api/auth/signin', {
        method: 'POST', // It's a POST request, which is typically used to submit data to a server.
        headers: {
          'Content-Type': 'application/json', // it contains JSON data
        },
        body: JSON.stringify(formData), // converts into JSON string
      });

      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      // setLoading(false);
      // setError(null); // what if user tries once and gets the error and trying 2nd time --> we need to change the variable to false
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl   text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />

        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p> {/* we cannot add ' in Don't as it gives error in the production --> dont know why :) */}
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}