import { configureStore } from '@reduxjs/toolkit'
import { RootSlices } from './slice';

export const store = configureStore({
    reducer: RootSlices,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch