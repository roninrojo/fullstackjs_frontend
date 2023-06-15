import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext()

// El provider obtiene los datos
export const PacientesProvider = ({children}) => {
    
    const [pacientes, setPacientes] = useState([]); // -> definimos que nos devuelva un array
    // setPacientes recibira valores y pacientes lo hacemos disponible en el resto de componentes del context metiendolo en el props del context
    // Necesitaremos un custom hook para extraer los datos -> usePAcientes.jsx
    
    const [paciente, setPaciente] = useState({}); // -> definimos que nos devuelva un objeto

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('apv_token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    },[pacientes])

    const guardarPacientes = async paciente => {

        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                
                // Buscamos entre el objeto de pacientes el mismo item con id, si coicide lo sustituímos por el que nos tremos de data, el resto lo dejamos igual.
                const listadoPpacientesActaulizado = pacientes.map(item => item._id === data._id ? data : item)
                setPacientes(listadoPpacientesActaulizado)
            } catch (error) {
                console.log(data.response.data.msg)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, __v, ...pacienteGuardado } = data
                // con destructuring podemos crear un array con el "resto" de variables. Es una manera de descartar lo que no queremos.
                // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

                setPacientes(pacienteGuardado, ...pacientes);
            } catch (error) {
                console.log(data.response.data.msg)
            }
        }
    }

    const editPaciente = paciente => {
        setPaciente(paciente)
    }

    const deletePaciente = async id => {
        const confirmar = confirm("¿Quieres eliminar este paciente?")

        if (confirmar) {
            try {
                const token = localStorage.getItem('apv_token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                const listadoPpacientesActaulizado = pacientes.filter(item => item._id !== id)
                setPacientes(listadoPpacientesActaulizado)
                console.log(data)

            } catch (error) {
                console.log(data.response.data.msg)
            }
        }
    }

    
    // Definimos el provider del context
    return (
        // Aquí van los hijos
        // Requiere un prop obligatorio
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPacientes,
                editPaciente,
                deletePaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;
