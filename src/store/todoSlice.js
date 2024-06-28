import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			state.push({ id: Date.now(), text: action.payload, completed: false });
		},
		toggleTodo: (state, action) => {
			const todo = state.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
		toggleAllTodos: (state) => {
			const allCompleted = state.every((todo) => todo.completed);
			state.forEach((todo) => {
				todo.completed = !allCompleted;
			});
		},
		deleteAllTodos: (state) => {
			return [];
		},
	},
});

export const {
	addTodo,
	toggleTodo,
	deleteTodo,
	toggleAllTodos,
	deleteAllTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
