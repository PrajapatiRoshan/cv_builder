import { UserType } from '@/types/api.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  user: UserType | undefined;
};

const initialState: AuthState = {
  accessToken: null,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      console.log(action.payload);

      state.user = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.setItem('accessToken', '');
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setAccessToken, clearAccessToken, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

