import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RegistrationStoryType } from '@/types'



const loadLoacalStorage = () => {
  return{
    email: JSON.parse(localStorage.getItem("registartion") as string)?.email,
    password: JSON.parse(localStorage.getItem("registartion") as string)?.password,
    first_name: JSON.parse(localStorage.getItem("registartion") as string)?.first_name,
    second_name: JSON.parse(localStorage.getItem("registartion") as string)?.second_name,
    middle_name: JSON.parse(localStorage.getItem("registartion") as string)?.middle_name,
  }
}
const InitialState:RegistrationStoryType = loadLoacalStorage();


//action - generate for all reducer WOW
export const RegistrationSlice = createSlice({
  name: 'RegistrationStory',
  initialState:InitialState,
  reducers: {
    setData: (state, action: PayloadAction<RegistrationStoryType>) =>{
      Object.assign(state, action.payload);
      localStorage.setItem("registartion",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("registartion");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = RegistrationSlice.actions;
export default RegistrationSlice.reducer;