import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuth'

export default function ProtectedRoutes() {
    const { isAuthenticated } = useAuthContext()

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}
