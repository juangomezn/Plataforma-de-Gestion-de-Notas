import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import CompleteProfile from './pages/CompleteProfile'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Routes>
    </>
  )
}

export default App
