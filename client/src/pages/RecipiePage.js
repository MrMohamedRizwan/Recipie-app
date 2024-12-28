import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { API_URL } from "../config/urlcofig";
import axios from "axios";
const RecipiePage = () => {
    const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const navigate=useNavigate();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userInfo"));
		console.log("Home Page user", user);
		if (user) {
			navigate("/Recipie");
		} else {
			navigate("/");
		}
	}, []);
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const user = JSON.parse(localStorage.getItem("userInfo"));
				const auth = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
				const response = await axios.get(`${API_URL}/api/recipe/allRecipies`,auth);

				if (!response.data) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = response.data;
				console.log("Fetched recipes:", data); // Check if data structure is correct
				setRecipes(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, []);

	if (loading) {
		return (
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<div
					className='spinner'
					style={{
						border: "16px solid #f3f3f3",
						borderTop: "16px solid #3498db",
						borderRadius: "50%",
						width: "120px",
						height: "120px",
						animation: "spin 2s linear infinite",
					}}></div>
				<p>Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: "20px", textAlign: "center", color: "red" }}>
				<p>Error fetching recipes: {error}</p>
			</div>
		);
	}

	if (!recipes.length) {
		return (
			<div style={{ padding: "20px", textAlign: "center" }}>
				<p>No recipes found.</p>
			</div>
		);
	}

	return (
		<div style={{ padding: "20px" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
					gap: "20px",
				}}>
				{recipes.map((recipe) => (
					<div
						key={recipe._id}
						style={{
							border: "1px solid #ddd",
							borderRadius: "8px",
							overflow: "hidden",
							boxShadow: "0 0 10px rgba(0,0,0,0.1)",
							padding: "16px",
						}}>
						<Link
							to={`/recipe-image/${recipe._id}`}
							style={{ textDecoration: "none" }}>
							<img
								src={
									recipe.image ||
									"https://images.indianexpress.com/2023/12/food.jpg?w=640"
								}
								alt={recipe.title}
								style={{
									width: "100%",
									height: "200px",
									objectFit: "cover",
									borderRadius: "8px",
									cursor: "pointer",
								}}
							/>
						</Link>
						<div style={{ marginTop: "12px" }}>
							<h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
								{recipe.title || "No Title"}
							</h2>
							<p style={{ fontSize: "1rem" }}>
								{recipe.ingredients || "No Ingredients"}
							</p>
							<p style={{ fontSize: "0.875rem", color: "#555" }}>
								{recipe.instructions || "No Instructions"}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecipiePage;
