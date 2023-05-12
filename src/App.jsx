import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import AdminLayout from "./layout/AdminLayout";

import  Login from './pages/Login';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';
import Confirm from './pages/Confirm';
import NewPassword from "./pages/NewPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import AdministrarPacientes from "./pages/AdministrarPacientes";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<PacientesProvider>
					<Routes>
						<Route path="/" element={<AuthLayout />}>
							{/*  "index" le dice cual carga primero */}
							<Route index element={<Login />} /> 
							<Route path="register" element={<Register />} /> 
							<Route path="forgotten-password" element={<ForgottenPassword />} /> 
							<Route path="forgotten-password/:token" element={<NewPassword />} /> 
							<Route path="confirm/:token" element={<Confirm />} /> 
						</Route>

						<Route path="/admin" element={<AdminLayout />}>
							<Route index element={<AdministrarPacientes />} /> 
						</Route>
					</Routes>
				</PacientesProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
