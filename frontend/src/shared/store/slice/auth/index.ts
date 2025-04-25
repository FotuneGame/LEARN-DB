import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthStoryType } from '@/types'


const loadLoacalStorage = () => {
  return{
    email: JSON.parse(localStorage.getItem("auth") as string)?.email,
    password: JSON.parse(localStorage.getItem("auth") as string)?.password
  }
}
const InitialState:AuthStoryType = loadLoacalStorage();


//action - generate for all reducer WOW
export const AuthSlice = createSlice({
  name: 'AuthStory',
  initialState:InitialState,
  reducers: {
    setData: (state, action: PayloadAction<AuthStoryType>) =>{
      Object.assign(state, action.payload);
      localStorage.setItem("auth",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("auth");
      Object.assign(state, InitialState);
    }
  },
})


export const actions = AuthSlice.actions;
export default AuthSlice.reducer;