import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import albumsReducer from './slices/albums-slice';
import artistsReducer from './slices/artists-slice';
import tracksReducer from './slices/tracks-slice';
export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
