
import React, { useContext, useState } from 'react';
import UserContext from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';


const UserRegister = () => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: '', password: '', Cpassword: '' })
    const { UserRegister } = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        if (credential.password === credential.Cpassword) {
            UserRegister(credential.email, credential.Cpassword)
            navigate('/')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} />
                    <label htmlFor="Cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="Cpassword" name='Cpassword' placeholder="Confirm Password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default UserRegister
