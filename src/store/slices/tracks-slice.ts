import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../';
import { fetchTopTracks, TracksRawData, TracksData } from '../helpers';
export interface InitialState {
  pages: TracksRawData["data"]["toptracks"]["@attr"] | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: InitialState = {
  pages: null,
  status: 'idle',
};


const trackAdapter = createEntityAdapter<TracksData>({
    selectId: (track) => track.url,
});

export const fetchTopTracksAsync = createAsyncThunk(
  'track/fetch',
  async (name: string) => {
    const response = await fetchTopTracks(name);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState: {
    ...trackAdapter.getInitialState(),
    ...initialState
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTracksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopTracksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.pages = action.payload.toptracks['@attr'];
        trackAdapter.setAll(state, action.payload.toptracks.track);
      })
      .addCase(fetchTopTracksAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
export const selectTracks = (state: RootState) => Object.values(state.tracks.entities) as Array<TracksData>


export default tracksSlice.reducer;
