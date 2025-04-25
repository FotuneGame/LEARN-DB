import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CodeType, CodeStoryType } from '@/types'


const loadLoacalStorage = () => {
  return{
    type: localStorage.getItem("type_code") as CodeType,
  }
}

const InitialState:CodeStoryType = loadLoacalStorage();


//action - generate for all reducer WOW
export const CodeSlice = createSlice({
  name: 'CodeStory',
  initialState:InitialState,
  reducers: {
    setType: (state, action: PayloadAction<CodeType>) =>{
      if(action.payload)
        localStorage.setItem("type_code",action.payload);
      state.type = action.payload;
    },
    setDefault: (state) =>{
      localStorage.removeItem("type_code");
      Object.assign(state, loadLoacalStorage());
    }
  },
})


export const actions = CodeSlice.actions;
export default CodeSlice.reducer;