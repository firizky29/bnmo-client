
import React from 'react';
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
		props.setUser((preValue: any) => {
			return {
				...preValue, id: '',
				name: '',
				username: '',
				is_admin: false
			}
		})
		navigate('/login');
	}

	if (props.isLoggedIn) {
		return (
			<header className="shadow sticky-top p-3 bg-dark text-white flex-md-nowrap">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
							BNMO
						</a>



						<div className="dropdown text-end ms-auto">
							<a href="/" className="d-block text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
								<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle me-3" />
								<span className="ml-2 d-none d-lg-inline-block">{props.user.username}</span>
							</a>
							<ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
								<li><a className="dropdown-item" href="/">Profile</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="/" onClick={logout}>Logout</a></li>
							</ul>
						</div>
					</div>
				</div>
			</header>

			
						

		);

	}
	else {
		return (
			<header className="shadow sticky-top p-3 bg-dark text-white flex-md-nowrap">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
							BNMO
						</a>



						<div className="text-end ms-auto">
							<Link to='/login'>
								<button type="button" className="btn btn-outline-light me-2">Login</button>
							</Link>
							<Link to='/register'>
								<button type="button" className="btn btn-warning">Register</button>
							</Link>
						</div>
					</div>
				</div>
			</header>

		);
	}
};

export default Navbar;