import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Login = () => {

	

	return ( 
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-xl mb-5 md:text-6xl">Inicia Sesión y Administra tus <span className="text-black">pacientes</span> 🐶🐱🐭🦊</h1>
			</div>
			<div className="shadow-lg rounded border p-5 bg-white">
				<form action="" className="flex flex-col gap-5">
					<div>
						<label
							htmlFor="email"
							className="uppercase text-gray-600 block text-xl font-bold mb-2"
						>
							Email
						</label>
						<input
							placeholder="Email de registro"
							type="text"
							name="email"
							id="email"
							className="border border-gray-300 rounded w-full p-3"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="uppercase text-gray-600 block text-xl font-bold mb-2"
						>
							Password
						</label>
						<input
							placeholder="Password"
							type="password"
							name="password"
							id="password"
							className="border border-gray-300 rounded w-full p-3"
						/>
					</div>

					<input type="submit" value="Enviar"
					className="w-full bg-indigo-600 text-white p-4 rounded font-bold uppercase hover:cursor-pointer hover:bg-indigo-500"/>
				</form>

				<nav
					className="mt-5 flex gap-5 flex-col md:flex-row">
					<Link to="/register" className={"text-indigo-600 hover:text-indigo-500"}>¿No tienes cuenta? Registrate</Link> <span className="hidden md:inline-block">|</span>
					<Link to="/forgotten-password" className={"text-indigo-600 hover:text-indigo-500"}>¿Olvidáste el password?</Link>
				</nav>
			</div>
		</>
	)
}

export default Login;
