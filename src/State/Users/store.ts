import {configureStore} from '@reduxjs/toolkit';
import { userApi } from './userApi';

export const store=configureStore({
    reducer:
    {
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    {
        return getDefaultMiddleware().concat(userApi.middleware);
    }
});
