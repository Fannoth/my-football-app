// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutUser } from '@services/firebaseAuth';

interface AuthState {
  user: {
    email: string;
    uid: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    email: '',
    uid: '',
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setLoading(state: AuthState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state: AuthState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state: AuthState) {
      logoutUser();
      state.user = {
        email: '',
        uid: '',
      };
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
