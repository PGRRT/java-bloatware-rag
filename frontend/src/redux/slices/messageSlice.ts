import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/api/userApi";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  chatId: string;
  sender: "user" | "gpt";
  text: string;
  createdAt: string;
}

interface MessagesState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  isLoading: false,
  error: null,
};

// 1️⃣ AsyncThunk do pobierania wiadomości dla konkretnego chatId
export const fetchMessagesAction = createAsyncThunk(
  "messages/fetchMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.getMessagesForChat(chatId);
      return response.data; // zakładamy, że API zwraca listę wiadomości
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(m => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessagesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchMessagesAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.messages = action.payload;
        }
      );
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
