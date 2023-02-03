import { Outlet } from "react-router-dom";
export const AuthLayout = () => {
    return (
        <>
            <main className="containee mx-auto md:grid md:grid-cols-2 mt-10 p-5 gap-10">
                <Outlet />
                {/* Establece un slot o espacio vacío dentro de un componente, donde podemos renderizar el resultado de una ruta. */}
            </main>
        </>
    )
}
