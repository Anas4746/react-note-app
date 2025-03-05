
import React from 'react'
import UserContext from './UserContext'
import { useNavigate } from 'react-router-dom'

const UserState = (props) => {
    // const host = "http://localhost:2600";
    const navigate = useNavigate();
    const UserLogin = async (email, password) => {
        console.log(email, password)
        const response = await fetch(`http://localhost:2600/user/userLogin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password
            })
        })
        if (!response.ok) {
            // Check for HTTP error status
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        if (data.success.success === true) {
            localStorage.setItem('token', data.authToken)
            console.log(data.authToken)
            navigate('/')
        } else {
            alert('Email or Password Incorrect');
        }
    }

    const UserRegister = async (email, password) => {
        console.log(email, password)
        const response = await fetch(`http://localhost:2600/user/userRegister`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        if (!response.ok) {
            // Check for HTTP error status
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        if (data.success.success === true) {
            navigate('/userLogin')
        } else {
            alert('Email or Password Incorrect');
        }
    }

    return (
        <UserContext.Provider value={{ UserLogin, UserRegister }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
