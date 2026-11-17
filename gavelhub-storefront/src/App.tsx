import { Navigate, Route, Routes } from 'react-router-dom'
import {ExplorarLotesPage} from './lotes/pages/ExplorarLotesPage'

function App() {
  return (
    <Routes>
      <Route path="/lotes" element={<ExplorarLotesPage />} />
      <Route path="/" element={<Navigate to="/lotes" replace />} />
      <Route path="*" element={<Navigate to="/lotes" replace />} />
    </Routes>
  )
}

export default App
