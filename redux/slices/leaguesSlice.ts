import { RootState } from '@redux/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopLeagues } from '@services/footballApi';

export const getTopLeagues = createAsyncThunk<
  Array<{ id: number; name: string; logo: string; country: string }>,
  void,
  {
    state: RootState;
  }
>('leagues/getTopLeagues', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  if (state.leagues.leagues.length > 0) {
    console.log(state.leagues);
    return state.leagues.leagues;
  }

  const response = await fetchTopLeagues();
  return response;
});

interface LeagueState {
  leagues: {
    id: number;
    name: string;
    logo: string;
    country: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: LeagueState = {
  leagues: [],
  loading: false,
  error: null,
};

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopLeagues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload;
      })
      .addCase(getTopLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leagues';
      });
  },
});

export default leaguesSlice.reducer;
