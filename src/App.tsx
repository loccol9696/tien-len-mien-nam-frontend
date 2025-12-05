import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import MusicPlayer from './components/MusicPlayer'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Component để conditionally render MusicPlayer
const ConditionalMusicPlayer = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <MusicPlayer /> : null
}

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
            <ConditionalMusicPlayer />
          </Router>
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  )
}

export default App

