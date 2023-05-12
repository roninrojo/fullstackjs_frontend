import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"
import { useState } from "react"

const AdministrarPacientes = () => {
	const [showForm, setShowForm] = useState(false)
	return (
		<div className="flex flex-col md:flex-row gap-5">
			<button type="button" className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-10 p-3 rounded md:hidden"
				onClick={() => setShowForm(!showForm)}
			>{`${showForm ? 'Ocultar' : 'Mostrar'}`} Formulario</button>
			<div className={`${showForm ? 'block' : 'hidden'} md:block  md:w-1/2 lg:w-2/5`}>
				<Formulario />
			</div>

			<div className="md:w-1/2 lg:w-3/5">
				<ListadoPacientes />
			</div>
		</div>
	)
}

export default AdministrarPacientes