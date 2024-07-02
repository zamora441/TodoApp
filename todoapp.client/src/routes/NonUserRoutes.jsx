import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuth'

export default function NonUserRoutes() {
    const { isAuthenticated } = useAuthContext()

  return ( isAuthenticated ? <Navigate to={"/"} /> : <Outlet/>
  )
}
