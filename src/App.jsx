import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Listing from './pages/Listing'
import Profile from './pages/Profile'
import Header from './components/Header'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import PrivateRoute from './components/PrivateRoute'
import Search from './pages/Search'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import toast, { Toaster } from 'react-hot-toast';
export default function App() {
  return (
    
   <BrowserRouter>
   <Header/>
   <Toaster position="top-right" reverseOrder={false}/>
 
   <Routes>
   <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/update-listing/:listingId' element={<UpdateListing/>} />
 

        </Route>
   </Routes>
   
   <Footer/>
   </BrowserRouter>
  )
}
