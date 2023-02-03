import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import axios from 'axios';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NewPassword = () => {
	const [passwordModificado, setPasswordModificado] = useState(false);
	const [tokenValido, setTokenValido] = useState(false);
	const [loading, setLoading] = useState(true);
	const [alerta, setAlerta] = useState({});
	const [password, setPassword] = useState('');
	
	const params = useParams();
	const {	token } = params;
	
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				const url = `/veterinarios/password-reset/${token}`;
				await clienteAxios(url) // axios default -> get
				setTokenValido(true);
				setAlerta({
					msg: "✏️ escribe un nuevo passowrd"
				})
			} catch (error) {
				setAlerta({
					msg: "Hubo un error para restablecer el password",
					error: true
				})
			}
			setLoading(false)
		}
		comprobarToken();
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (password.length < 6) {
			setAlerta({ msg: "El password debe tener al menos 6 carácteres", error: true })
			return
		}

		setAlerta({})

		// Enviamos petición a la API
		try {
			const url = `/veterinarios/password-reset/${token}`;
			const { data } = await clienteAxios.post(url, { password });
			setAlerta({
				msg: data.msg,
				error: false
			})

			setPasswordModificado(true)

		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})
		}
	}

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-xl mb-5 md:text-6xl">Restablece <span className="text-black">tu password</span></h1>
			</div>
			<div className="shadow-lg rounded border p-5 bg-white">
				{!loading &&
					<Alerta
						alerta={alerta}
					/>
				}
				{tokenValido && (
					<>
						<form
							className="flex flex-col gap-5"
							onSubmit={handleSubmit}
						>
							<input
								placeholder="Nuevo Password"
								type="password"
								className="border border-gray-300 rounded w-full p-3"
								value={password}
								onChange={ e => setPassword(e.target.value)}
							/>
							<input type="submit" value="Enviar"
							className="w-full bg-indigo-600 text-white p-4 rounded font-bold uppercase hover:cursor-pointer hover:bg-indigo-500" />
						</form>
						{passwordModificado && (
							<nav className="mt-5 flex gap-5 flex-col md:flex-row">
								<Link to="/" className={"text-indigo-600 hover:text-indigo-500"}>Inicia sesión</Link>
							</nav>
						)}
					</>

					)
				}
				
			</div>
		</>
	)
}

export default NewPassword