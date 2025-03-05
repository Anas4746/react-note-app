
import React, { useContext, useState } from 'react'
import UserContext from '../context/user/UserContext'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const [credential, setCredential] = useState({ email: '', password: '' })
    const { UserLogin } = useContext(UserContext)
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        UserLogin(credential.email, credential.password)
        navigate('/')
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' placeholder="Enter email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} />
                </div>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default UserLogin
