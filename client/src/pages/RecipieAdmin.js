import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateRecipe from '../components/CreateRecipe';

const RecipieAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(""); // `null` means not checked yet
  const [loading, setLoading] = useState(true);
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
  //   const { data } = await axios.get('/api/user/admin', {
  //     headers: {
  //       Authorization: Bearer ${JSON.parse(token).token} // Adjust the key as needed
  //     }
  //   });

  //   setIsAdmin(data.isAdmin);
  //   if (!data.isAdmin) {
  //     navigate('/'); // Redirect if not an admin
  //   }
  // } else {
  //   navigate('/'); // Redirect if no user info
  // }
    const checkAdmin = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const  isAdmin  = JSON.parse(userInfo);
          
          setIsAdmin(isAdmin);
          if (isAdmin === 'admin') {
            navigate('/'); // Redirect if not an admin
          }
        } else {
          navigate('/'); // Redirect if no user info
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate('/'); // Redirect if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAdmin === false) {
    return <div>Access denied.</div>; // Handle cases where user is not admin
  }

  return (
    <div>
      <CreateRecipe/>

    </div>
  );
};

export default RecipieAdmin;
