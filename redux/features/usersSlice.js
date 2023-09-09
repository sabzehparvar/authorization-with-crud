import { createSlice } from '@reduxjs/toolkit'



//  initial state
const initialState = {
    users:[]
 

};


export const usersSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    Add: (state,action) => {
      state.users.push(action.payload)
      
    },
    Remove: (state) => {
      state.users = []
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { Add , Remove} = usersSlice.actions


export default usersSlice.reducer
