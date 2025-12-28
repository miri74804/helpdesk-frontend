import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import NotFound from './pages/NotFound'
import TicketDetails from './pages/TicketDetails'
import NewTicket from './pages/NewTicket'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Navbar from './components/common/Navbar'
import Loading from './components/common/Loading'
import UserManagement from './components/admin/UserManagement'
import StatusManagement from './components/admin/StatusManagement'

function App() {

  const { isAuthenticated, loading } = useAuth();

  { loading && <Loading /> }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<StatusManagement />} />
        </Route>
        <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
        <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetails /></ProtectedRoute>} />
        <Route path="/tickets/new" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
