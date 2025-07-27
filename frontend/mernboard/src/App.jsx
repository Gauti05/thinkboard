import React from 'react'
import { Routes,Route } from 'react-router'
import Home from './Pages/Home'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div data-theme="relative h-full w-full">
     <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/create' element={<CreatePage/>}/>
<Route path='/note/:id' element={<NoteDetailPage/>}/>



      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App


