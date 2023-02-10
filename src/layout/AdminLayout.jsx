import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header"
import Footer from "../components/Footer"

const AdminLayout = () => {
    const { auth, loading } = useAuth()
    if (loading) {
        return 'cargando...' // TO DO css spinner
    }
    return (
        <>
            <Header />
            {
                auth?._id ? (
                // 👆 https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining 
                    
                    <main className="container mx-auto mt-20">
                        <Outlet />
                    </main>
                ) : <Navigate to="/" />
            }
            <Footer />
        </>
    )
}

export default AdminLayout