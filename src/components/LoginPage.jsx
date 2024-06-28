import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, validate } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { email, password, errors, isLoggedIn } = useSelector(
		(state) => state.login
	);

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/todolist");
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(validate());
	};

	return (
		<Container>
			<FlexBox>
				<Border>
					<Flex onSubmit={handleSubmit}>
						<Text>Login</Text>
						<Inputs
							type="email"
							value={email}
							placeholder="Email"
							onChange={(e) => dispatch(setEmail(e.target.value))}
						/>
						{errors.email && <ErrorText>{errors.email}</ErrorText>}
						<Inputs
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => dispatch(setPassword(e.target.value))}
						/>
						{errors.password && <ErrorText>{errors.password}</ErrorText>}
						<Buttons type="submit">Войти</Buttons>
					</Flex>
				</Border>
			</FlexBox>
		</Container>
	);
};

export default LoginPage;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const Border = styled.div`
	width: 350px;
	padding: 20px;
	border-radius: 10px;
	background: white;
	box-shadow: 0 4px 10px 5px rgba(0, 0, 0, 0.2);
`;

const Flex = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
`;

const Text = styled.h1`
	font-family: "Roboto", sans-serif;
	color: #333;
	margin-bottom: 20px;
	position: relative;
	top: 10px;
`;

const Inputs = styled.input`
	width: 100%;
	height: 40px;
	padding-left: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	&:focus {
		border-color: #007bff;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
	}
`;

const Buttons = styled.button`
	width: 100%;
	height: 45px;
	border: none;
	font-size: 18px;
	color: white;
	border-radius: 5px;
	font-weight: 700;
	text-transform: uppercase;
	transition: 0.3s;
	cursor: pointer;
	background: #007bff;
	box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
	&:hover {
		background: #0056b3;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.4), 0 0 10px rgba(0, 123, 255, 0.4),
			0 0 20px rgba(0, 123, 255, 0.4);
	}
`;

const ErrorText = styled.p`
	color: red;
	font-family: Arial, Helvetica, sans-serif;
`;
