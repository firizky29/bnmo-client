
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';


const Navbar = (props: any) => {
	let navigate = useNavigate();
	const logout = async () => {
		await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		props.setIsLoggedIn(false);
		props.setUser((preValue: any) => { return {...preValue, id:'',
				name: '',
				username: '',
				is_admin: false}})	
		navigate('/login');
	}

	if (props.isLoggedIn) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light fixed-top">
				<div className="container">
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<button type="button" className="btn btn-light" onClick={logout}>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);

	}
	else {
		return (
			<nav className="navbar navbar-expand-lg navbar-light fixed-top">
				<div className="container">
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<Link className="nav-link" to={'/login'}>
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to={'/register'}>
									Register
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
};

export default Navbar;