import React, { useContext } from 'react'
// import on1 from '../img/navbar/on1.JPG'
import on1 from '../img/navbar/profile.JPG'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className="logo">Instagram</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>LogOut</button>
      </div>
    </div>
  )
}

export default Navbar
