import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {
    const { editPaciente, deletePaciente } = usePacientes();    
    const { email, nombre, propietario, sintomas, fecha } = paciente;

    const formatDate = (date) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(newDate)
    }

    return (
        <div className="bg-white py-5 px-5 mb-10 lg:mb-5 shadow-md rounded-md border-l-8 border-indigo-500" >
            <p className="mb-2"><span className="font-bold">NOMBRE</span>: {nombre}</p>
            <p className="mb-2"><span className="font-bold">SINTOMAS</span>: {sintomas}</p>
            <p className="mb-2"><span className="font-bold">PROPIETARIO</span>: {propietario}</p>
            <p className="mb-2"><span className="font-bold">EMAIL</span>: {email}</p>
            <p><span className="font-bold">FECHA</span>: {formatDate(fecha)}</p>

            <div className="flex justify-between mt-5 mb-0">
                <button
                    className="py-1 px-5 rounded-sm bg-indigo-600 text-white hover:bg-indigo-500"
                    onClick={() => editPaciente(paciente)}
                >Editar</button>

                <button
                    className="py-1 px-5 rounded-sm bg-red-100 text-red-500 hover:bg-red-500 hover:text-red-50"
                    onClick={() => deletePaciente(paciente._id)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente