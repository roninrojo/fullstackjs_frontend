import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// https://es.reactjs.org/docs/context.html#when-to-use-context
const AuthContext = createContext();

const AuthProvider = ({ children }) => { 
    
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const atenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token');

            if (!token) {
                setLoading(false)
                return
            }

            // console.log('token 👍')

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data: {veterinario} } = await clienteAxios('/veterinarios/perfil', config);
                // console.log(veterinario)
                setAuth(veterinario)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setLoading(false)
        }
        atenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            // Le decimos que está disponible de manera global
            value={{
                auth,
                setAuth,
                loading,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;
