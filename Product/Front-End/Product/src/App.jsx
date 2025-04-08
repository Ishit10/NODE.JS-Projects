
import './App.css'
import { Route, Routes } from 'react-router'
import Login from './components/Login'
import NavBar from './components/Navbar'
import Products from './pages/Products'

function App() {
  

  return (
    <>
    <NavBar/>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/products" element={<Products />} />
     </Routes>
    </>
  )
}

export default App
