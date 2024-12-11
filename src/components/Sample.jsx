import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { takeUserUrl } from '../configaration/endpoints';

function Sample() {
    
    const [message,setMessage]=useState(false)
    
    const currentPath = window.location.pathname;
    const lastPathSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const currentBaseUrl=window.location.origin

    const navigate=useNavigate()
    
    useEffect(()=>{
       valudUrl()
    })

    const valudUrl=async ()=>{
        try {
            const response=await takeUserUrl(lastPathSegment)
            const orgUrl = response?.data; // Ensure the correct field is accessed
            if (orgUrl) {
                console.log('Redirecting to:', orgUrl);
                const orgBaseUrl=new URL(orgUrl).origin;
                console.log(orgBaseUrl);
                
                if(currentBaseUrl==orgBaseUrl){
                    
                }else{
                     window.location.href = orgUrl;
                }

                 // Change location
            } else {
                console.error('No valid URL returned.');
               
            }
            
        } catch (error) {
           // console.log(444,error);
            if(!message){
                toast.error(error.response.data.message)
                setMessage(true)
            }
           
            navigate('/dashboard')

            
        }
    }

    
    
  return (
    <div>
        <div className='pt-[70px] h-[400px] bg-gray-700'>
            <div></div>
        </div>
    </div>
  )
}

export default Sample