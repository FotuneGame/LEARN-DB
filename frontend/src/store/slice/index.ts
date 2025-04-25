import {combineSlices} from '@reduxjs/toolkit';
import {UserSlice} from "./user/";
import {AuthSlice} from "./auth/";
import {RegistrationSlice} from "./registration/";
import {ForgetSlice} from "./forget/";
import {CodeSlice} from "./code/";
import { SecuritySlice } from './security';

export const RootSlices = combineSlices(UserSlice, AuthSlice, RegistrationSlice, ForgetSlice, CodeSlice,SecuritySlice, {
    user: UserSlice.reducer,
    auth: AuthSlice.reducer,
    registration: RegistrationSlice.reducer,
    forget: ForgetSlice.reducer,
    code: CodeSlice.reducer,
    security: SecuritySlice.reducer
})