import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
// Custom Hook
// Desde aquí extraemos la información que hagamos disponsible en el context -> AuthProvider.jsx

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;