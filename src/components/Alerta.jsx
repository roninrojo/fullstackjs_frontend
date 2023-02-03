const Alerta = ({ alerta }) => {
	// console.log(alerta)
	return (
		<>
			<div
				className={`${alerta.error ?
				'bg-red-200 rounded border border-red-300 p-2 mb-5 text-red-800'
				:
				'bg-blue-200 rounded border border-blue-300 p-2 mb-5 text-blue-800'}`}
			>
				{alerta.msg}
			</div>
		</>
	)
}

export default Alerta;