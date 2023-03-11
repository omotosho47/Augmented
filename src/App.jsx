import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Chart from "./pages/Chart"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Chart />} path="/" />
        </Routes>
      </Router>
    </div>
  )
}

export default App
