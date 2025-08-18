"use client"
import { useEffect, useState } from "react";

import { UserService } from "@/service/user/user.service";
import { useToken } from "./useToken";

// Custom Hook to handle API requests
const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token} = useToken()
  console.log(token);
  
  useEffect(() => {
    if (!url || !token) return; // Skip if URL or token is missing

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting request
        const response = await UserService.getData(url,token)
        setData(response.data); // Save the response data
      } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, [url, token]);

  return { data, loading, error }; 
};

export default useFetchData;
