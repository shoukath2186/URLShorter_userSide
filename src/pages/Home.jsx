import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveModal from '../components/NewLInkModal';


export default function Home() {
  const [url,setUrl]=useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const NewUrl=()=>{
      
      if(user){
        setUrl('')
        setIsModalOpen(true)
        
      }else{
        navigate('/login')
      }
      
  }
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex items-center justify-center pb-10">
      <ResponsiveModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                url={url}
            />
      <div className="text-center p-6 max-w-2xl">
        <h1 className="text-4xl md:text-[58px] mt-[100px] font-extrabold mb-6">
          Welcome to <span className="text-blue-400">LinkSnap</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 mt-10 text-gray-300">
          Simplify your links. Share them easily. Manage them like a pro. Our URL shortener makes it quick and effortless.
        </p>

        <div className="mt-6 "> 
          <input
            type="text"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="w-full md:w-3/4 p-4 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button className="w-full md:w-auto mt-4 md:mt-4 md:ml-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition duration-300"
          onClick={()=>NewUrl()}>
            Shorten URL
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="space-y-4 text-left max-w-md mx-auto">
            <li className="flex items-center space-x-3">
              <span className="text-xl">🚀</span>
              <span className="text-gray-300">Lightning-fast link shortening</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-xl">🔗</span>
              <span className="text-gray-300">Easy-to-remember URLs</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-xl">📊</span>
              <span className="text-gray-300">Analytics to track your links</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-xl">🔒</span>
              <span className="text-gray-300">Secure and reliable</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
