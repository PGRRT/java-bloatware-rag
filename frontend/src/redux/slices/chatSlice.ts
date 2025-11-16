// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { User, AuthState, Credentials, RegisterData } from '@/types/user';
import { userApi } from "@/api/userApi";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  chats: [] as Array<{ id: string; title: string }>,
  isLoading: false,
  error: null as string | null,
};

export const fetchChatsAction = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getChats();
      return response.data;
    } catch (error: any) {
      return true;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchChatsAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.chats = action.payload;
        }
      );
  },
});

// export const { fetchChats } = chatSlice.actions;
export default chatSlice.reducer;
