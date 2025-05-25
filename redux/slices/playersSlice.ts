import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeamDetails } from '@services/footballApi';

export const getTeamDetails = createAsyncThunk('players/getTeamDetails', async (teamId: string) => {
  const response = await fetchTeamDetails(teamId);
  return response;
});

interface Player {
  id: number;
  name: string;
  age: number;
  nationality: string;
  photo: string;
  position: string;
}

interface PlayersState {
  team: {
    id: number;
    name: string;
    logo: string;
    squad: Player[];
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  team: null,
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(getTeamDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch team details';
      });
  },
});

export default playersSlice.reducer;
