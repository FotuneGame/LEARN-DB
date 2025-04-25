import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SecurityStoryType } from '@/types'


const loadLoacalStorage = () => {
  return{
    email: JSON.parse(localStorage.getItem("security") as string)?.email,
    phone: JSON.parse(localStorage.getItem("security") as string)?.phone,
    password: JSON.parse(localStorage.getItem("security") as string)?.password
  }
}

const InitialState:SecurityStoryType = loadLoacalStorage();


//action - generate for all reducer WOW
export const SecuritySlice = createSlice({
  name: 'SecurityStory',
  initialState:InitialState,
  reducers: {
    setData: (state, action: PayloadAction<SecurityStoryType>) =>{
      Object.assign(state, action.payload);
      localStorage.setItem("security",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("security");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = SecuritySlice.actions;
export default SecuritySlice.reducer;