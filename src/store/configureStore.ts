// src/store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default store;
