import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import ModuleErrorBoundary from "./components/ErrorBoundary"

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<ModuleErrorBoundary />} path="/" />
        </Routes>
      </Router>
    </div>
  )
}

export default App
