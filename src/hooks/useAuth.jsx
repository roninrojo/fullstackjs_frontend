import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
// Custom Hook
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;