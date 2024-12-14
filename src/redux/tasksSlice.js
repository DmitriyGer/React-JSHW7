import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksData from '../data/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasksData);
    }, 1000);
  });
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    theme: 'light',
    loading: false,
  },
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleTask, toggleTheme } = tasksSlice.actions; // Экспортируем toggleTheme
export default tasksSlice.reducer;
