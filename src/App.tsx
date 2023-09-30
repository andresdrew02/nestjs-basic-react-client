import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Tienda from './pages/Tienda';
import Info from './pages/Info';
import Logout from './pages/Logout';
import { isTokenAvailable, isTokenValid, getProfile } from './lib/Auth';
import { userAtom } from './store/store';
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import Login from './pages/Login';
import Product from './pages/DetailedProduct';
import Carrito from './pages/Carrito';

export default function App() {
  const [, setUser] = useAtom(userAtom)

  async function checkAuth() {
    if (!isTokenAvailable()) return

    if (await isTokenValid()){
      setUser(await getProfile())
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Tienda/>} />
        <Route path="/info" element={<Info/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/carrito" element={<Carrito/>} />
      </Routes>
    </BrowserRouter>
  )
}