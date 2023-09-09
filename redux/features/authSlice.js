import { createSlice } from '@reduxjs/toolkit'



//  initial state
const initialState = {
    user:{
        auth: {
            token: null,
          },
            email: null,
    }
 

};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state,action) => {
      state.user.auth.token = action.payload.token;
      state.user.email = action.payload.email;
    },
    LOGOUT: (state) => {
      state.user.auth.token = null;
      state.user.email = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT } = authSlice.actions


export default authSlice.reducer
