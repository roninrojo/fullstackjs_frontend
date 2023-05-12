import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";
// Custom Hook
// Desde aquí extraemos la información que hagamos disponsible en el context -> PacientesProvider.jsx

const usePacientes = () => {
    return useContext(PacientesContext);
}

export default usePacientes;