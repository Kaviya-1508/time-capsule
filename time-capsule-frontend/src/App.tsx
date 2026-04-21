import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateCapsule from './pages/CreateCapsule'
import MyCapsules from './pages/MyCapsules'
import ViewCapsule from './pages/ViewCapsule'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <Routes>
          <Route path="/" element={<CreateCapsule />} />
          <Route path="/my-capsules" element={<MyCapsules />} />
          <Route path="/capsule/:id" element={<ViewCapsule />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App