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

            <p>que pasa?</p>
        </>
  )
}

export default UpdatePassword