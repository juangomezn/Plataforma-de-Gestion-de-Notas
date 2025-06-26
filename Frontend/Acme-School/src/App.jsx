import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import CompleteProfile from './pages/CompleteProfile'
import Login from './pages/Login'
import AdminPage from './pages/Adminpage'
import UserManagement from './pages/UserManagment'
import UserProfile from './pages/UserProfile'
//import AdminDashboard from './pages/AdminDashboard'
//import TeacherDashboard from './pages/TeacherDashboard'
//import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
    </Routes>
  )
}

export default App