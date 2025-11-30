import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ReactNode } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute

