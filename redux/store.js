import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';



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