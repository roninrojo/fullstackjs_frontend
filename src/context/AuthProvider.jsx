import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// https://es.reactjs.org/docs/context.html#when-to-use-context
const AuthContext = createContext();

const AuthProvider = ({ children }) => { 
    
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
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
                // Usamos un alias
                const { data: {veterinario} } = await clienteAxios('/veterinarios/perfil', config);
                // console.log(veterinario)
                setAuth(veterinario)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setLoading(false)
        }
        autenticarUsuario();
    }, [])

    const editUser = async datos => {
        // console.log(datos._id)
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const data = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
            // console.log(data)
            return {
                msg: "Cambios guardados ✅",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
                classError: "border-red-500"
            }
        }
    }

    const editPassword = async datos => {
        // const [id] = datos;
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const data = await clienteAxios.put('/veterinarios/password', datos, config);
            console.log(data)
            return {
                msg: "Cambios guardados ✅",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
                classError: "border-red-500"
            }
        }
    }

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
                editUser,
                editPassword,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;
