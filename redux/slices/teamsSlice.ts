import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLeagueTable } from '@services/footballApi';

export const getLeagueTable = createAsyncThunk('teams/getLeagueTable', async (leagueId: string) => {
  const response = await fetchLeagueTable(leagueId);
  return response;
});

interface TeamsState {
  table: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    points: number;
    rank: number;
    played: number;
    win: number;
    draw: number;
    lose: number;
    goalsFor: number;
    goalsAgainst: number;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  table: [],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeagueTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeagueTable.fulfilled, (state, action) => {
        state.loading = false;
        state.table = action.payload;
      })
      .addCase(getLeagueTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch league table';
      });
  },
});

export default teamsSlice.reducer;
