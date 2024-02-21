import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styling/register.css'

const Register = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate('/products');
        } else {
            alert("Invalid details, try again")
            navigate('/register');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={onChange} name="username" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={6} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>Already have an account? <Link to="/login">Sign up</Link></p>
        </div>
    )
}

export default Register;
