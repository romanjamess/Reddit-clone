import './App.css'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'


function App() {


  return (
    <>
   <Navbar />
   <Outlet></Outlet>
    </>
  )
}

export default App
