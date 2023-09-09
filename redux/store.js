import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import usersSlice from './features/usersSlice';
import { combineReducers } from'redux';



// Configure Redux Persist
const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: hardSet,
};

const usersPersistConfig = {
  key: 'list',
  storage,
  stateReconciler: hardSet,
};


// combine reducers
const rootReducer = combineReducers({
  authPersistReducer: persistReducer(authPersistConfig, authSlice),
  usersPersistReducer: persistReducer(usersPersistConfig, usersSlice),
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };