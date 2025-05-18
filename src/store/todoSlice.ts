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
      const n = state.todos.length;
      state.todos.push({
        id: n ? state.todos[n-1].id + 1 : 1,
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
        todo.name = action.payload.name;
      }

      // let ind = state.todos.findIndex(t => t.id == action.payload.id);
      // if (ind >= 0) {
      //   const todo = state.todos[ind];
      //   state.todos[ind] = {...todo, name: action.payload.name};
      // }
    },
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      state.currentTodo = action.payload;
    },
    unSetCurrentTodo: (state, action: PayloadAction) => {
      delete state.currentTodo;
    }
  },
});

export const {addTodo, deleteTodo, toggleTodo, updateTodo, setCurrentTodo, unSetCurrentTodo} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectCurrentTodo = (state: RootState) => state.todo.currentTodo;

export default todoSlice.reducer;
