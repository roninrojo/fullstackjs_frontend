import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

	const { pacientes } = usePacientes();
	
	return ( 
		<>
			{ pacientes.length ? 
			(
				<>
					<p className="text-lg text-center mb-10">
						Administra tus <span className="text-indigo-500 font-bold">pacientes</span>
					</p>
						{
							pacientes.map(item => (
								<Paciente
									key={item._id}
									paciente={item}
								/>
							))
								/*	💡
									El método map en React utiliza paréntesis en lugar de llaves alrededor del cuerpo de la función de flecha que se pasa como argumento al método map. Esto se debe a que cuando utilizamos paréntesis, estamos indicando a JavaScript que queremos devolver una expresión. En cambio, si utilizamos llaves, estaríamos definiendo un bloque de código que requiere la declaración explícita de return.
									pacientes.map(item => {
										return (
											<Paciente
											/>	
										)
									}
									El uso de paréntesis en lugar de llaves en el método map de React es una convención común que simplifica la sintaxis y mejora la legibilidad del código. Además, permite que el código sea más conciso y reduce la posibilidad de errores de sintaxis.
								*/
							
						}
				</>
			)
			:
			(
				<>
					<p className="text-lg text-center">
						<span className="text-red-400 font-bold">No hay pacientes.</span>
						{' '} Agrega un <span className="text-indigo-500 font-bold">paciente</span>
					</p>
				</>
			)}
		</>
	)
}

export default ListadoPacientes