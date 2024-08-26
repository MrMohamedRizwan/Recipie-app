import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/SignUp";
import Login from "../components/login";
import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";

const HomePage = () => {
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem("userInfo"));
	// 	console.log("Home Page user", user);
		
	// }, []);
	// console.log(history)

	console.log("Home");
	return (
		<Container maxW='xl' centerContent>
			<Box
				d='flex'
				justifyContent='center'
				p={3}
				bg={"#2C6487"}
				w='100%'
				m='40px 0 15px 0'
				borderRadius='lg'
				borderWidth='1px'>
				<Text
					fontSize='4xl'
					fontFamily='Work sans'
					color='#ADD8F7'
					align='center'>
					Recipie - app
				</Text>
			</Box>
			<Box
				backgroundColor={"#F5F5F5"}
				d='flex'
				justifyContent='center'
				p={4}
				bg={"white"}
				w='100%'
				m='15px 0 15px 0'
				borderRadius='lg'
				borderWidth='1px'
				color='black'>
				<Tabs variant='soft-rounded'>
					<TabList>
						<Tab width='50%'>Login</Tab>
						<Tab width='50%'>SignUp</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default HomePage;
