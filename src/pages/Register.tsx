import React, { useState, useEffect, SyntheticEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { BASE_URL, API_URL } from '../config.js';
import { Navigate } from 'react-router-dom';


const Register = (props: any) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ktp, setKtp] = useState<any | null>(null);
    const [errors, setErrors] = useState({
        name: '',
        username: '',
        password: '',
        ktp: '',
        confirmPassword: '',
        message: ''
    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!errors.name && !errors.username && !errors.password && !errors.ktp && !errors.confirmPassword) {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    ktp
                })
            })
            if (res.status === 200) {
                props.setAlert('Successfully registered, please login');
                props.setShow(true);
            } else {
                const data = await res.json();
                setErrors(prevState => { return { ...prevState, ...data } });
            }
        }
    }


    const onChangeKTP = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        let files = target.files;
        if (files) {
            if (files[0].size > 10e6) {
                setErrors({ ...errors, ktp: 'File size is too large' });
            }
            else {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = (event) => {
                    setKtp(event.target?.result);
                    const imgPreview = document.getElementById('img-preview');
                    if (imgPreview) imgPreview.style.display = 'block';
                }
            }
        }
    }

    const onChangeConfirmPassword = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (password !== target.value) {
            setErrors({ ...errors, confirmPassword: 'Password not match' });
        } else {
            setErrors({ ...errors, confirmPassword: '' });
        }
        setConfirmPassword(target.value);
    }

    const onChangeUsername = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const re = /^\S*$/;
        if (target.value.length < 6) {
            setErrors({ ...errors, username: 'Username must be at least 6 characters' });
        }
        else if (!re.test(target.value)) {
            setErrors({ ...errors, username: 'Username must not contain space' });
        }
        else {
            setErrors({ ...errors, username: '' });
        }
        setUsername(target.value);
    }

    const onChangePassword = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!re.test(target.value)) {
            setErrors({ ...errors, password: 'Password must contain at least 8 characters, one letter, one number and one special character' });
        }
        else {
            setErrors({ ...errors, password: '' });
        }

        if (confirmPassword) {
            if (target.value !== confirmPassword) {
                setErrors({ ...errors, confirmPassword: 'Password not match' });
            } else {
                setErrors({ ...errors, confirmPassword: '' });
            }
        }
        setPassword(target.value);
    }


    if (props.isLoggedIn) {
        return <Navigate replace to='/' />
    }
    else {
        return (
            <div className="auth-wrapper pd-10">
                <div className="auth-inner mb-4 mt-3">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <h3>Register</h3>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                                onChange={e => setName(e.target.value)}
                            />
                            <div className="text-danger">{errors.name}</div>
                        </div>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Pick a username"
                                required
                                onChange={onChangeUsername} />
                            <div className="text-danger">{errors.username}</div>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Create your password"
                                required
                                onChange={onChangePassword}
                            />
                            <div className="text-danger">{errors.password}</div>
                        </div>

                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password"
                                required
                                onChange={onChangeConfirmPassword}
                            />
                            <div className="text-danger">{errors.confirmPassword}</div>
                        </div>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Identification Card</Form.Label>
                            <Form.Control type="file" onChange={onChangeKTP} required accept="image/png, image/jpeg, image/webp" />
                            <div className="text-danger">{errors.ktp}</div>
                        </Form.Group>

                        <img className="img-preview img-fluid mb-3" src={ktp} alt="" />
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p className="already-registered text-right">
                            Already registered? <a href="/login">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
};

export default Register;