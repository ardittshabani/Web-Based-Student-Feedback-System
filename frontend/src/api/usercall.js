import { useState, useEffect } from "react";
import axios from "./axios";
import { jwtDecode } from "jwt-decode";

export default function useUserCall(token) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const username = decodedToken.sub;

                const response = await axios.get(`/Account/user?username=${username}`);
                setUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, [token]);

    return userId;
}
