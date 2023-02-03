import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import axios from 'axios';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Confirm = () => { 
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState({});
    const params = useParams();
    const { token } = params;

    // useEffect -> https://midu.dev/react-hooks-use-effect-funcionalidad-en-el-ciclo-vida-componentes/
    useEffect(() => {
        const confrimarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${token}`;
                const { data } = await clienteAxios(url) // axios default -> get
                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setLoading(false)
        }
        confrimarCuenta();
    }, []) // -> "Esto le diría a React que nuestro efecto no depende de ningún valor y que, por lo tanto, sólo debería ejecutarse al montarse y desmontarse nuestro componente."

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-xl mb-5 md:text-6xl">Confirma <span className="text-black">tu cuenta</span></h1>
            </div>
            <div className="shadow-lg rounded border p-5 bg-white">
               {!loading && <Alerta
                    alerta={alerta}
                />}
                {cuentaConfirmada && (
                    <Link to="/" className={"text-indigo-600 hover:text-indigo-500"}>Inicia sesión</Link>
                )}
            </div>
        </>
    )
}

export default Confirm;