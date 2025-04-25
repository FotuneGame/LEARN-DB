import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ForgetStoryType } from '@/types'


const loadLoacalStorage = () => {
  return{
    email: JSON.parse(localStorage.getItem("forget") as string)?.email,
    password: JSON.parse(localStorage.getItem("forget") as string)?.password,
    confirm: JSON.parse(localStorage.getItem("forget") as string)?.confirm
  }
}
const InitialState:ForgetStoryType = loadLoacalStorage();


//action - generate for all reducer WOW
export const ForgetSlice = createSlice({
  name: 'ForgetStory',
  initialState:InitialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) =>{
      state.email = action.payload;
      localStorage.setItem("forget",JSON.stringify(state));
    },
    setConfirm: (state, action: PayloadAction<boolean>) =>{
      state.confirm = action.payload;
      localStorage.setItem("forget",JSON.stringify(state));
    },
    setPassword: (state, action: PayloadAction<string>) =>{
      state.password = action.payload;
      localStorage.setItem("forget",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("forget");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = ForgetSlice.actions;
export default ForgetSlice.reducer;