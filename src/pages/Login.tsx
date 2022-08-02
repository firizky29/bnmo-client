import React, { SyntheticEvent, useState } from 'react';
import { API_URL } from '../config';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        credential: '',
        message: ''
    });
    const navigate = useNavigate();


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });
        if (res.status === 200) {
            const data = await res.json();
            props.setIsLoggedIn(true);
            navigate('/');
        } else {
            const data = await res.json();
            setErrors({ ...errors, ...data });
        }
    }

    if (props.isLoggedIn) {
        return <Navigate replace to="/" />
    }
    else {
        return (
            <div className="auth-wrapper pd-10">
                <div className="auth-inner mb-4 mt-3">
                    <form onSubmit={submit}>
                        <h3>Login to BNMO</h3>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-danger mb-3">{errors.credential}</div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" onClick={submit}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

};

export default Login;