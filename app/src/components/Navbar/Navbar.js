import './Navbar.css'
import { useCallback, useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authActions'
import logo from '../../assets/images/Keep-it-logo-259x300.jpg'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'


const Navbar = () => {

    const { user: currentUser } = useSelector(store => store.authReducer)

    const [userMenu, setUserMenu] = useState(false)

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    
    return (
        <nav className="navbar">
          <div className='flex centered'>
            <Link to={"/home"} className="nav-link">Home</Link>
            <Link to={"/about"} className="nav-link">About</Link>
            <Link to={"/help"} className="nav-link">Help</Link>
          </div>
          
          <div className='logo-container'>
            <Link to={"/"} className="navbar-brand"> <img src={logo} alt="logo" /></Link>
          </div>
          <div className='user-nav flex centered'>
            {currentUser ? (
              <>
                <li className="nav-item nav-welcome">
                  <span onClick={()=>setUserMenu(!userMenu)}>Welcome, {currentUser.username}!{userMenu ? <IoMdArrowDropup className='arrow-drop'/> : <IoMdArrowDropdown className='arrow-drop'/>}</span>
                  <div className='nav-user-overlay' style={{ height: userMenu ? '150px' : '0' }}>
                    <p className="nav-item">
                      <Link to={"/notes"} className="nav-link">My Notes</Link>
                    </p>
                    <p className="nav-item">
                      <Link to={"/profile"} className="nav-link">My Profile</Link>
                    </p>
                    <p className="nav-item">
                      <Link to="/login" className="nav-link" onClick={logOut}>Logout</Link>
                    </p>

                  </div>
                </li>
                

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">Login</Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">Sign Up</Link>
                </li>
              </>

            )}
          </div>
      </nav>
    )
}

export default Navbar