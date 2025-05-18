import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { Action } from 'redux'
import { PersistPartial } from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
   
const persistedReducer = persistReducer(persistConfig, todoReducer)
   

export const store = configureStore({
    reducer:{
        todo: persistedReducer 
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor = persistStore(store)
