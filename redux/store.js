import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';


// // Define initial state
// const initialState = {
//   auth: {
//     token: null,
//   },
//   email: null,

// };

// // Define reducer
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         auth: {
//           token: action.payload.token,
//         },
//         email: action.payload.email
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         auth: {
//           token: null,
//         },
//         email: null,
//       };
//     default:
//       return state;
//   }
// };

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, authSlice);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };