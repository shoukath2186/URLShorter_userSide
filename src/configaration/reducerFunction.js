

import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('user')) || null; 

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const userData = action.payload;
      localStorage.setItem('user', JSON.stringify(userData)); 
      return userData; 
    },
    removeUserData: () => {
      localStorage.removeItem('user'); 
      return null; 
    }
  }
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
