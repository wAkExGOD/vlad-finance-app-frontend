// import { configureStore } from "@reduxjs/toolkit";
// import { postsReducer } from "./slices/posts";
// import { authReducer } from "./slices/auth";

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/AuthSlice';
import purchasesReducer from './reducers/PurchasesSlice';

// MIDDLEWARE
// const localStorageMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem('appState', JSON.stringify(getState()));
//     return result;
//   };
// };

// const reHydrateStore = () => {
//   if (localStorage.getItem('appState') !== null) {
//     return JSON.parse(localStorage.getItem('appState'));
//   }
// };

// STORE CONFIGURATION
const store = configureStore({
  reducer: {
    auth: authReducer,
    purchases: purchasesReducer,
  },
  // preloadedState: reHydrateStore(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;