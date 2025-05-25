import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leaguesReducer from './slices/leaguesSlice';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leagues: leaguesReducer,
    teams: teamsReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
