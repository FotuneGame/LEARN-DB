import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { EmployeeType } from '@/types'


const loadLoacalStorage = () =>{
  return{
    id: JSON.parse(localStorage.getItem("employee") as string)?.id ?? 0,
    post: JSON.parse(localStorage.getItem("employee") as string)?.post,
  }
}
const InitialState: EmployeeType = loadLoacalStorage();


//action - generate for all reducer WOW
export const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState:InitialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<EmployeeType>) =>{
      Object.assign(state, action.payload);
      localStorage.setItem("employee",JSON.stringify(state));
    },
    setDefault: (state) =>{
      localStorage.removeItem("employee");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = EmployeeSlice.actions;
export default EmployeeSlice.reducer;