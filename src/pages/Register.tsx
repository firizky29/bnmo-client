import React from 'react';
import Form from 'react-bootstrap/Form';


const Register = () => {
    return (
        <form>
            <h3>Register</h3>
            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                />
            </div>
            <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Pick a username" />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Create your password"
                />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Identification Card</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
            <p className="already-registered text-right">
                Already registered? <a href="/sign-in">Login</a>
            </p>
        </form>
    );
};

export default Register;