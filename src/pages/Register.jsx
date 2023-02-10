import { useState } from 'react';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Register = () => {
    const [nombre,setNombre] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg:"Todos los campos son obligatorios",error:true})
            return
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: "El primer password es diferente del segundo", error: true })
            return
        }

        if (password.length < 6) {
            setAlerta({ msg: "El password debe tener más de 6 carácteres", error: true })
            return
        }

        setAlerta({})

        // Crear usuario en la API
        try {
            await clienteAxios.post("/veterinarios", { nombre, email, password });
            setAlerta({
                msg: "Usuario creado correctamente, revisa tu email 📨",
                error: false
            })
            e.target.reset()

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    
    const alertMsg = alerta.msg;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-xl mb-5 md:text-6xl">Inicia Sesión y Administra tus <span className="text-black">pacientes</span> 🐶🐱🐭🦊</h1>
            </div>
            <div className="shadow-lg rounded border p-5 bg-white">
                {
                    // https://stackoverflow.com/questions/40682064/what-does-operator-indicate-with-this-props-children-react-cloneelemen
                    // Short circuit evaluation
                    // (if this part is true) && (this part will execute)
                    alertMsg && <Alerta
                        alerta={alerta}
                    />
                }
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold mb-2">
                            Nombre
                        </label>
                        <input
                            placeholder="Tu nombre"
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                            className="border border-gray-300 rounded w-full p-3" />
                    </div>
                    <div>
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold mb-2">
                            Email
                        </label>
                        <input
                            placeholder="Tu nombre"
                            type="text"
                            name="email"
                            id="email"
                            className="border border-gray-300 rounded w-full p-3"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="repeat-password"
                            className="uppercase text-gray-600 block text-xl font-bold mb-2"
                        >
                            Tu Password
                        </label>
                        <input
                            placeholder="Password"
                            type="password"
                            className="border border-gray-300 rounded w-full p-3"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold mb-2">
                            Repite el Password
                        </label>
                        <input
                            placeholder="Repite tu Password aquí"
                            type="password"
                            className="border border-gray-300 rounded w-full p-3"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                            
                        />
                    </div>


                    <input type="submit" value="Enviar"
                        className="w-full bg-indigo-600 text-white p-4 rounded font-bold uppercase hover:cursor-pointer hover:bg-indigo-500" />
                </form>
                <nav className="mt-5 flex gap-5 flex-col md:flex-row">
                    <span>Si ya tienes cuenta <Link to="/" className={"text-indigo-600 hover:text-indigo-500"}>Inicia sesión</Link></span>
                </nav>
            </div>
        </>
    )
}

export default Register;