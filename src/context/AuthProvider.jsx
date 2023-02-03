import { useState, useEffect, createContext } from 'react';

// https://es.reactjs.org/docs/context.html#when-to-use-context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [auth,setAuth] = useState({})

    return (
        <AuthContext.Provider
            // Le decimos que está disponible de manera global
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;
