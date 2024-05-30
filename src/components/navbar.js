
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const LogOut = () => {
        localStorage.removeItem('token');
        navigate('/userLogin')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mx-3" to="/">Navbar</Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
            {token ?
                <div className="d-flex justify-content-end"><button className='btn btn-primary mx-3' onClick={LogOut}>Logout</button></div> :
                <div className="d-flex justify-content-end">
                    <Link to='/userLogin'><button type="button" className="btn btn-primary ">Login</button></Link>
                    <Link to='/userRegister'><button type="button" className="btn btn-primary mx-3">Register</button></Link>
                </div>}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    )
}

export default Navbar
