import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { data, useNavigate } from 'react-router-dom'
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { logout } from '../configaration/endpoints';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../configaration/reducerFunction';
import { toast } from 'react-toastify';
function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    

    const menuRef = useRef(null);
    const user = useSelector((state) => state.user); 

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const HandilClick = () => {
        navigate('/login')
    }

    const handleLogout = async () => {

        try {
            const data = await logout()
            console.log(data);
            dispatch(removeUserData())
            toast.success(data.message)
            navigate('/login');
            setIsMenuOpen(false);
        } catch (error) {
            console.log(error);
            

        }

    }

    const handleDashboard = () => {
        navigate('/dashboard');
        setIsMenuOpen(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);
    return (
        <div className='w-full bg-gray-900 shadow-lg  h-[70px] fixed z-10'>
            <div className='w-full h-full flex items-center justify-between'>
                <div className='w-full m-6 flex items-center justify-center '>
                    <a href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-gray-100 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                            LinkSnap
                        </span>
                    </a>
                </div>
                <div className='w-full m-6 flex items-center justify-center '>

                </div>
                {user ? (
                    <div className='w-full m-6 flex items-center justify-center '>
                        <div className='relative' ref={menuRef}>
                            <div className='flex items-center'>
                                <div className='hover:bg-gray-700 p-2 rounded-lg transition-colors cursor-pointer'
                                    onClick={handleDashboard}>
                                    <LayoutDashboard className='w-7 h-7 mr-3 text-blue-400 '

                                    />
                                </div>

                                <button
                                    onClick={toggleMenu}
                                    className='flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-lg transition-colors'
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt="User profile"
                                            className='w-8 h-8 rounded-full object-cover border-2 border-gray-600'
                                        />
                                    ) : (
                                        <User className='w-6 h-6' />
                                    )}
                                    <span className='hidden md:inline'>{user.name}</span>
                                </button>
                            </div>
                            {isMenuOpen && (

                                <div className='absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden animate-dropdown'>
                                    <div className='px-4 py-3 bg-gray-900 border-b border-gray-700'>
                                        <p className='text-sm text-gray-300'>Signed in as</p>
                                        <p className='text-white font-semibold'>{user.userName}</p>
                                    </div>
                                    <div className='py-1'>
                                        <button
                                            onClick={handleDashboard}
                                            className='w-full flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors'
                                        >
                                            <LayoutDashboard className='w-5 h-5 mr-3 text-blue-400' />
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className='w-full flex items-center px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors'
                                        >
                                            <LogOut className='w-5 h-5 mr-3' />
                                            Logout
                                        </button>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                ) : (
                    <div className='w-full m-6 flex items-center justify-center '>
                        <button className='bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-700 duration-300' onClick={HandilClick}>Get Start</button>
                    </div>
                )}


            </div>
        </div>
    )
}

export default NavBar