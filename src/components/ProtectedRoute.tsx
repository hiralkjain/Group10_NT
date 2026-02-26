import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />
}

export default ProtectedRoute