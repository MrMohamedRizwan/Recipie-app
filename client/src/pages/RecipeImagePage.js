import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/urlcofig";
import axios from "axios";

const RecipeImagePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const navigate=useNavigate();
	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem("userInfo"));
	// 	console.log("Home Page user", user);
	// 	if (user) {
	// 		navigate("/Recipie");
	// 	} else {
	// 		navigate("/");
	// 	}
	// }, []);
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                	const user = JSON.parse(localStorage.getItem("userInfo"));
				const auth = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
                const response = await axios.get(`${API_URL}/api/recipe/${id}`,auth);
                if (!response.data) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = response.data;
                setRecipe(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

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
                <p>Error fetching recipe: {error}</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>No recipe found.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
                padding: "20px",
            }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{recipe.title || 'No Title'}</h1>
            <img
                src={recipe.image || 'https://images.indianexpress.com/2023/12/food.jpg?w=640'}
                alt={recipe.title || 'Recipe Image'}
                style={{ maxWidth: "90%", maxHeight: "50vh", borderRadius: "8px", marginBottom: "20px" }}
            />
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Ingredients</h2>
                <p>{recipe.ingredients || 'No Ingredients'}</p>
                <h2 style={{ fontSize: "1.5rem", marginTop: "20px", marginBottom: "10px" }}>Instructions</h2>
                <p>{recipe.instructions || 'No Instructions'}</p>
            </div>
        </div>
    );
};

export default RecipeImagePage;
