import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
      <nav className="flex gap-2">
          <Link
              to="/admin/perfil/"
              className="font-bold text-gray-500"
          >Perfil</Link>
          |
          <Link
              to="/admin/password/"
              className="font-bold text-gray-500"
          >Editar password</Link>
      </nav>
  )
}

export default AdminNav