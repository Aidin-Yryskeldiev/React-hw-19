import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import LoginPage from "./components/LoginPage";
import TodoList from "./components/TodoList";

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/todolist" element={<TodoList />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
