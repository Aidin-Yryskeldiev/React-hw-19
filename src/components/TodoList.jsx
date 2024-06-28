import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addTodo,
	toggleTodo,
	deleteTodo,
	toggleAllTodos,
	deleteAllTodos,
} from "../store/todoSlice";
import styled from "styled-components";

const TodoList = () => {
	const [todo, setTodo] = useState("");
	const [toggleButtonText, setToggleButtonText] = useState("Complete All");
	const [errorMessage, setErrorMessage] = useState("");
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	useEffect(() => {
		const storedToggleButtonText = localStorage.getItem("toggleButtonText");
		if (storedToggleButtonText) {
			setToggleButtonText(storedToggleButtonText);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todo.trim()) {
			dispatch(addTodo(todo));
			setTodo("");
			setErrorMessage("");
		} else {
			setErrorMessage("Заполните поле");
		}
	};

	const handleToggleAll = () => {
		dispatch(toggleAllTodos());
		const newText =
			toggleButtonText === "Complete All" ? "Uncomplete All" : "Complete All";
		setToggleButtonText(newText);
		localStorage.setItem("toggleButtonText", newText);
	};

	const handleDeleteAll = () => {
		dispatch(deleteAllTodos());
	};

	return (
		<Container>
			<Title>Todo List</Title>
			<FormWrapper>
				<Form onSubmit={handleSubmit}>
					<Input
						type="text"
						value={todo}
						placeholder="Введите текст"
						onChange={(e) => setTodo(e.target.value)}
					/>
					<Button type="submit">Добавить</Button>
				</Form>
				{errorMessage && <Error>{errorMessage}</Error>}
			</FormWrapper>
			<Button onClick={handleToggleAll}>{toggleButtonText}</Button>
			<Button onClick={handleDeleteAll}>Удалить все</Button>
			<TodoContainer>
				{todos.map((todo) => (
					<TodoItem key={todo.id}>
						<Checkbox
							type="checkbox"
							checked={todo.completed}
							onChange={() => dispatch(toggleTodo(todo.id))}
						/>
						<TodoText completed={todo.completed}>{todo.text}</TodoText>
						<Button onClick={() => dispatch(deleteTodo(todo.id))}>
							Удалить
						</Button>
					</TodoItem>
				))}
			</TodoContainer>
		</Container>
	);
};

export default TodoList;

const Container = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	position: relative;
	top: 200px;
`;

const Title = styled.h1`
	text-align: center;
	font-family: Arial, Helvetica, sans-serif;
	position: relative;
	top: -10px;
`;

const FormWrapper = styled.div`
	margin-bottom: 20px;
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Input = styled.input`
	flex: 1;
	padding: 10px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	margin-left: 5px;

	&:hover {
		background-color: #0056b3;
	}
`;

const Error = styled.p`
	color: red;
	text-align: center;
	margin-top: 10px;
	font-family: Arial, Helvetica, sans-serif;
`;

const TodoContainer = styled.div`
	margin-top: 20px;
`;

const TodoItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #ccc;
`;

const Checkbox = styled.input`
	cursor: pointer;
`;

const TodoText = styled.span`
	text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
	flex: 1;
	margin-left: 10px;
	color: ${(props) => (props.completed ? "#999" : "#333")};
	font-size: 16px;
`;
