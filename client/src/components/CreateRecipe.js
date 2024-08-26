import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	Heading,
	useToast,
	Image,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../config/urlcofig";
import Compressor from "compressorjs";

const CreateRecipe = () => {
	const [title, setTitle] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [instructions, setInstructions] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(e.target.files[0]);
			// console.log("Original fffeile:", file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
	
		const formData = new FormData();
		formData.append("title", title);
		formData.append("ingredients", ingredients);
		formData.append("instructions", instructions);
	
		// Ensure the file input is correctly accessed
		const fileInput = event.target.querySelector('input[type="file"]'); // Adjust if necessary
		const file = fileInput ? fileInput.files[0] : null;
	
		if (file) {
			console.log("Selected file:", file);
			formData.append('image', file); // Append the selected file
		}
	
		// Log FormData entries
		for (let [key, value] of formData.entries()) {
			console.log(key, value); // This will show all form data
		}
	
		try {
			const response = await axios.post(`${API_URL}/api/recipe/ccrec`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response.data); // Handle response data
		} catch (error) {
			console.error(
				"Error creating recipe:",
				error.response ? error.response.data : error.message
			);
		}
	};
	

	return (
		<Box maxW='md' mx='auto' p={5} borderWidth={1} borderRadius='md'>
			<Heading mb={4}>Create Recipe</Heading>
			<VStack spacing={4} align='stretch'>
				<FormControl id='title' isRequired>
					<FormLabel>Recipe Title</FormLabel>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Enter recipe title'
					/>
				</FormControl>
				<FormControl id='ingredients' isRequired>
					<FormLabel>Ingredients</FormLabel>
					<Textarea
						value={ingredients}
						onChange={(e) => setIngredients(e.target.value)}
						placeholder='Enter ingredients'
					/>
				</FormControl>
				<FormControl id='instructions' isRequired>
					<FormLabel>Instructions</FormLabel>
					<Textarea
						value={instructions}
						onChange={(e) => setInstructions(e.target.value)}
						placeholder='Enter cooking instructions'
					/>
				</FormControl>
				<FormControl id='image'>
					<FormLabel>Recipe Image</FormLabel>
					<Input type='file' accept='image' onChange={handleImageChange} />
					{preview && (
						<Box mt={2} textAlign='center'>
							<Image
								src={preview}
								alt='Preview'
								boxSize='200px'
								objectFit='cover'
							/>
						</Box>
					)}
				</FormControl>
				<Button colorScheme='teal' onClick={handleSubmit} isLoading={loading}>
					Create Recipe
				</Button>
			</VStack>
		</Box>
	);
};

export default CreateRecipe;
