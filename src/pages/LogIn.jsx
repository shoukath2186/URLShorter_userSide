import React, { useState } from 'react';

import { validateLoginForm } from '../Validation/LoginValidation';
import { loginUs } from '../configaration/endpoints';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../configaration/reducerFunction';
import Loading from '../components/Loading';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const navegate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  async function loginUser(formData) {
    setLoading(true)
    try {
      const datas = await loginUs(formData);
      // console.log(datas);
      dispatch(setUserData(datas.data));
      navegate('/')

    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLoginForm(formData, setErrors)) {

      loginUser(formData)

    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center pt-24 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-gray-700 text-gray-100 
                ${errors.email
                  ? 'border-2 border-red-500 focus:ring-red-500'
                  : 'border border-gray-600 focus:ring-blue-500'
                } 
                focus:outline-none focus:ring-2`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-gray-700 text-gray-100 
                  ${errors.password
                    ? 'border-2 border-red-500 focus:ring-red-500'
                    : 'border border-gray-600 focus:ring-blue-500'
                  } 
                  focus:outline-none focus:ring-2`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          {/* <div className="text-right">
            <a 
              href="/forgot-password" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Forgot Password?
            </a>
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <Loading/>
              ) : (
                'Log In'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don't have an account? {' '}
              <a href="/register" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;