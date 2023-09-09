import { createSlice } from '@reduxjs/toolkit'



// Define initial state
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
   
  },
})

// Action creators are generated for each case reducer function
export const { Add } = usersSlice.actions

console.log(Add());

export default usersSlice.reducer
