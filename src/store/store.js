import { configureStore } from "@reduxjs/toolkit";
import authReduceer from "./authSlice";



const store = configureStore({
  reducer: {
    auth : authReduceer,
  }
})

export default store