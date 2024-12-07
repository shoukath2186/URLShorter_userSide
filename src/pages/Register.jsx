import React, { useState } from 'react';

import { validateForm } from '../Validation/RegisterValidation';
import { register } from '../configaration/endpoints';

import { setUserData } from '../configaration/reducerFunction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading]=useState(false);

  const dispatch = useDispatch();
  const navegate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validateForm(formData,setErrors)) {
      // TODO: Handle form submission (e.g., API call)
      console.log('Form submitted', formData);
      setLoading(true)
      try {
       const data=await register(formData)
       console.log(data);
       dispatch(setUserData(data.data));
       navegate('/')
      } catch (error) {
       // console.log(error.response.data.message);
        toast.error(error.response.data.message)
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center pt-24 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
          Create Your Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-gray-700 text-gray-100 
                ${errors.username 
                  ? 'border-2 border-red-500 focus:ring-red-500' 
                  : 'border border-gray-600 focus:ring-blue-500'
                } 
                focus:outline-none focus:ring-2`}
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

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
                placeholder="Create a strong password"
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

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-gray-700 text-gray-100 
                  ${errors.confirmPassword 
                    ? 'border-2 border-red-500 focus:ring-red-500' 
                    : 'border border-gray-600 focus:ring-blue-500'
                  } 
                  focus:outline-none focus:ring-2`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>


          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Create Account
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account? {' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;