// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import LoginReducer from './actions/LoginActions';
// import RegisterReducer from "./actions/RegisterAction";

// const store = configureStore({
//     reducer: {
//         login : LoginReducer,
//         register : RegisterReducer,
//     },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import LoginReducer from '../slice/LoginActions';
import RegisterReducer from "../slice/RegisterAction";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['login', 'register'], 
};

const rootReducer = combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>; 
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store); 

export default store;
