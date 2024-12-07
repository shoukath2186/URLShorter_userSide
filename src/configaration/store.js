import { configureStore } from "@reduxjs/toolkit";
import userReduser from './reducerFunction'

const store=configureStore({
    reducer:{
        user:userReduser
    }
})

export default store