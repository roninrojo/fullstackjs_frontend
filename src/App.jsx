import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from './layout/AuthLayout';
import  Login from './pages/Login';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';
import Confirm from './pages/Confirm';
import NewPassword from "./pages/NewPassword";

import { AuthProvider } from "./context/AuthProvider";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						{/*  "index" le dice cual carga primero */}
						<Route index element={<Login />} /> 
						<Route path="register" element={<Register />} /> 
						<Route path="forgotten-password" element={<ForgottenPassword />} /> 
						<Route path="forgotten-password/:token" element={<NewPassword />} /> 
						<Route path="confirm/:token" element={<Confirm />} /> 
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
