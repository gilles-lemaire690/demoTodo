import {createSlice} from '@reduxjs/toolkit';

import Todo, {TodoState} from '../models/todo';
import {Platform} from 'react-native';
import {PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../models/store';

const initialState: TodoState = {
  todos: [],
};
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: state.todos.length ? state.todos[-1].id + 1 : 1,
        name: action.payload,
        status: false,
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(t => t.id != action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id == action.payload);
      if (todo) {
        todo.status = !todo.status;
      }
    },
    updateTodo: (state, action: PayloadAction<{id: number; name: string}>) => {
      let todo = state.todos.find(t => t.id == action.payload.id);
      if (todo) {
        todo = {...todo, name: action.payload.name};
      }
    },
  },
});

export const {addTodo, deleteTodo, toggleTodo, updateTodo} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
