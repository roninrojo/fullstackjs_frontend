import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

const UpdateUser = () => {

	const { auth, editUser } = useAuth();
	const [perfil, setPerfil] = useState({});
	const [alerta, setAlerta] = useState({});
	const [classError, setClassError] = useState({});

	useEffect(() => {
	  setPerfil(auth)
	}, [auth])

	const handleSubmit = async e => {
		e.preventDefault()
		const { nombre, email } = perfil;
		
		if ([email, nombre].includes('')) {
			setAlerta({
				msg: 'Nombre y e-mail son obligatorios',
				error: true
			});

			return
		}

		const message = await editUser(perfil);
		setClassError(message.classError);
		// Si pasa la validación
		setAlerta(message)
	}

	
	const { msg } = alerta;

	console.log(classError)


	return (
    	<>
			<AdminNav></AdminNav>
			<h2 className="text-3xl font-black text-center mt-5">Editar Perfil 👤</h2>

			<div className="flex justify-center">
				<div className="w-full md:w-1/2 bg-white py-10 px-5 mb-10 mt-5 lg:mb-5 shadow-md rounded-md">
					<form
						onSubmit={handleSubmit}
					>
						<label htmlFor="nombre" className="my-2 inline-block cursor-pointer">Nombre</label>
						<input
							id="nombre"
							type="text"
							name="nombre"
							placeholder="Tu nombre de usuario"
							className="border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md"
							value={perfil.nombre || ''}
							onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} // <- ℹ️ https://medium.com/@gloriafercu/es6-spread-operator-en-arrays-y-objetos-e46bfc84a0d0
						/>

						<label htmlFor="web" className="my-2 inline-block cursor-pointer">Web</label>
						<input
							id="web"
							type="text"
							name="web"
							placeholder="La url de tu web"
							className="border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md"
							value={perfil.web || ''}
							onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
						/>

						<label htmlFor="telefono" className="my-2 inline-block cursor-pointer">Telefono</label>
						<input
							id="telefono"
							type="text"
							name="telefono"
							placeholder="Tu telefono"
							className="border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md"
							value={perfil.telefono || ''}
							onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
						/>

						<label htmlFor="email" className="my-2 inline-block cursor-pointer">E-mail</label>
						<input
							id="email"
							type="text"
							name="email"
							placeholder="Tu email"
							className={"border-2 w-full p-2 mb-5 placeholder-gray-400 rounded-md " + classError }
							value={perfil.email || ''}
							onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
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

export default UpdateUser