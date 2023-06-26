import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const UpdatePassword = () => {

    const { editPassword } = useAuth();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [classError, setClassError] = useState('');
    const [classErrorRepaet, setClassErrorRepeat] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault()

        if (password === '' || newPassword === '' || newPasswordRepeat === '') {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }

        if (newPassword.length < 6) {
            setAlerta({ msg: "El nuevo password debe tener más de 6 carácteres", error: true })
            setClassError("border-red-500")
            return
        }

        if (newPassword !== newPasswordRepeat) {
            setAlerta({ msg: "Escribe el nuevo password igual en los dos campos", error: true })
            setClassErrorRepeat("border-red-500")
            return
        }

        setClassError("")
        setClassErrorRepeat("")

        const message = await editPassword([password, newPassword]);
        setAlerta(message)
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav></AdminNav>
            <h2 className="text-3xl font-black text-center mt-5">Editar Password *️⃣ *️⃣ *️⃣</h2>

            <p>Test</p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white py-10 px-5 mb-10 mt-5 lg:mb-5 shadow-md rounded-md">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="password" className="my-2 inline-block cursor-pointer">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Escribe tu password actual"
                            className="border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <label htmlFor="new_password" className="my-2 inline-block cursor-pointer">Password Nuevo</label>
                        <input
                            id="new_password"
                            type="password"
                            name="new_password"
                            placeholder="Escribe tu nuevo password"
                            className={"border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md " + classError + classErrorRepaet}
                            onChange={e => setNewPassword(e.target.value)} 
                        />

                        <label htmlFor="new_password_repeat" className="my-2 inline-block cursor-pointer">Password Nuevo</label>
                        <input
                            id="new_password_repeat"
                            type="password"
                            name="new_password_repeat"
                            placeholder="Escribe tu nuevo password"
                            className={"border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md " +  classErrorRepaet}
                            onChange={e => setNewPasswordRepeat(e.target.value)}
                        />

                        {msg && <Alerta alerta={alerta} />}

                        <input
                            type="submit"
                            className="bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                            value="Guardar Cambios"

                        />
                    </form>

                </div>
            </div>
        </>
  )
}

export default UpdatePassword