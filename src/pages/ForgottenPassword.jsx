// import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ForgottenPassword = () => {
	const [email, setEmail] = useState('')
	const [alerta,setAlerta] = useState({})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (email === '') {
			setAlerta({ msg: "El campo email es obligatorio", error: true })
			return
		}

		setAlerta({})

		// Enviamos petición a la API
		try {
			await clienteAxios.post("/veterinarios/password-reset", { email });
			setAlerta({
				msg: "El usuario existe y hemos enviado un email",
				error: false
			})
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
				<h1 className="text-indigo-600 font-black text-xl mb-5 md:text-6xl">Recupera tu <span className="text-black">Password</span></h1>
			</div>

			<div className="shadow-lg rounded border p-5 bg-white">
				{
					alertMsg && < Alerta
					alerta = {
						alerta
					}
					/>
				}
				<form
					action=""
					className="flex flex-col gap-5"
					onSubmit={handleSubmit}
				>
					<div>
						<label
							htmlFor="email"
							className="uppercase text-gray-600 block text-xl font-bold mb-2"
						>
							Email
						</label>
						<input
							placeholder="Tu email"
							type="email"
							name="email"
							id="email"
							className="border border-gray-300 rounded w-full p-3"
							value={email}
							onChange={ e => setEmail(e.target.value)}
						/>
					</div>
					<p>Te enviaremos las instrucciones para recuperar el password en tu email</p>
					<input type="submit" value="Recuperar Password"
					className="w-full bg-indigo-600 text-white p-4 rounded font-bold uppercase hover:cursor-pointer hover:bg-indigo-500" />
				</form>
				<nav className="mt-5 flex gap-5 flex-col md:flex-row">
					<span>Si ya tienes cuenta <Link to="/" className={"text-indigo-600 hover:text-indigo-500"}>Inicia sesión</Link></span>
				</nav>
			</div>
		</>
	)
}

export default ForgottenPassword;