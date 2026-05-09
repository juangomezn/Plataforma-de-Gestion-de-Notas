import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/welcome'
import CompleteProfile from './pages/CompleteProfile'
import Login from './pages/login'
import AdminPage from './pages/Adminpage'
import UserManagement from './pages/UserManagment'
import CourseManagement from './pages/CourseManagement'
import EnrollmentPage from './pages/EnrollmentPage'
import UserProfile from './pages/UserProfile'
import Unauthorized from './pages/Unauthorized'
import Logout from './pages/Logout'
import ReportsPage from './pages/ReportsPage'
import { ProtectedRoute, RoleRoute } from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-page"
          element={
            <RoleRoute roles={['admin']}>
              <AdminPage />
            </RoleRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <RoleRoute roles={['admin']}>
              <UserManagement />
            </RoleRoute>
          }
        />
        <Route
          path="/course-management"
          element={
            <RoleRoute roles={['admin']}>
              <CourseManagement />
            </RoleRoute>
          }
        />
        <Route path="/enrollments" 
          element={
            <EnrollmentPage />
          } 
        />
        <Route path="/reports" 
          element={
            <ReportsPage />
          } 
        />
    </Routes>
  )
}

export default App
