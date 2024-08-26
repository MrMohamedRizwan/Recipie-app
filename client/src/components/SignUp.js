import {
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	createMultiStyleConfigHelpers,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/urlcofig";
// import { API_URL } from '../../configurations/config';
const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const toast = useToast();
	const [Loading, setloading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async () => {
		setloading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: "Please Fill all the Feilds",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setloading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: "Passwords Do Not Match",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		// console.log(name, email, password,  "details");
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				`${API_URL}/api/user`,
				{
					name,
					email,
					password,
				
				},
				config,
			);
			console.log(data);
			toast({
				title: "Registration Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));
			setloading(false);
			navigate("/Recipie");
		} catch (error) {
			toast({
				title: "Error Occured!",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setloading(false);
		}
	};
	return (
		<VStack spacing={"5px"}>
			<FormControl id='first-name' isRequired>
				<FormLabel>
					Name
					<Input
						placeholder='Enter your Name'
						onChange={(e) => setName(e.target.value)}
					/>
				</FormLabel>
			</FormControl>
			<FormControl id='email' isRequired>
				<FormLabel>
					Email
					<Input
						placeholder='Enter your Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormLabel>
			</FormControl>

			<FormControl id='password' isRequired>
				<FormLabel>
					Password
					<Input
						type='password'
						placeholder='Enter your Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormLabel>
			</FormControl>

			<FormControl id='ConfirmPwd' isRequired>
				<FormLabel>
					Re-type Password
					<Input
						type='password'
						placeholder='Re-enter your Password'
						onChange={(e) => setconfirmPassword(e.target.value)}
					/>
				</FormLabel>
			</FormControl>

			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={Loading}>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
