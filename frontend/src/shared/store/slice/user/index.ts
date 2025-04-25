import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '@/types'


const loadLoacalStorage = () =>{
  return{
    id: JSON.parse(localStorage.getItem("user") as string)?.id ?? 0,
    first_name: JSON.parse(localStorage.getItem("user") as string)?.first_name,
    second_name: JSON.parse(localStorage.getItem("user") as string)?.second_name,
    middle_name: JSON.parse(localStorage.getItem("user") as string)?.middle_name,
    avatar: JSON.parse(localStorage.getItem("user") as string)?.avatar,
    accessToken:  JSON.parse(localStorage.getItem("user") as string)?.accessToken,
    email: JSON.parse(localStorage.getItem("user") as string)?.email,
    phone: JSON.parse(localStorage.getItem("user") as string)?.phone,
  }
}
const InitialState: UserType = loadLoacalStorage();


//action - generate for all reducer WOW
export const UserSlice = createSlice({
  name: 'User',
  initialState:InitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) =>{
      Object.assign(state, action.payload);
      localStorage.setItem("user",JSON.stringify(state));
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
        localStorage.setItem("user",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("user");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = UserSlice.actions;
export default UserSlice.reducer;