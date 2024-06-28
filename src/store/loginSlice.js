import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
	name: "login",
	initialState: {
		email: "",
		password: "",
		errors: {
			email: "",
			password: "",
		},
		isLoggedIn: false,
	},
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
			state.errors.email = "";
		},
		setPassword: (state, action) => {
			state.password = action.payload;
			state.errors.password = "";
		},
		validate: (state) => {
			let isValid = true;
			if (!state.email) {
				state.errors.email = "Заполните поле";
				isValid = false;
			}
			if (!state.password) {
				state.errors.password = "Заполните поле";
				isValid = false;
			} else if (state.password.length < 8) {
				state.errors.password = "Пароль должен быть не менее 8 символов";
				isValid = false;
			}
			state.isLoggedIn = isValid;
		},
	},
});

export const { setEmail, setPassword, validate } = loginSlice.actions;

export default loginSlice.reducer;
