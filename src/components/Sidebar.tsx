import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Sidebar = (props: any) => {
    let navigate = useNavigate();
    let location = useLocation()
    
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

    if (props.isLoggedIn && props.user.is_admin) {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 ">
                    {/* <ul className="nav flex-column"> */}
                    <ul className="list-unstyled ps-0 py-5">
                        <li className="mb-1 me-auto">
                            <Link to="/users" className='text-decoration-none'>
                                <button className="btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Users
                                </button>
                            </Link>

                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="users/pending" className="link-dark d-inline-flex text-decoration-none rounded">Required Verification</Link></li>
                                    <li><Link to="users/verified" className="link-dark d-inline-flex text-decoration-none rounded">Verified Users</Link></li>
                                    <li><Link to="users/rejected" className="link-dark d-inline-flex text-decoration-none rounded">Rejected Users</Link></li>
                                </ul>
                            </div>

                        </li>
                        <li className="mb-1 me-auto">
                            <Link to="/transactions" className='text-decoration-none'>
                                <button className="btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                    Transactions
                                </button>
                            </Link>
                            <div className="collapse" id="dashboard-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="transactions/pending" className="link-dark d-inline-flex text-decoration-none rounded">Pending Requests</Link></li>
                                    <li><Link to="transactions/accepted" className="link-dark d-inline-flex text-decoration-none rounded">Accepted Requests</Link></li>
                                    <li><Link to="transactions/rejected" className="link-dark d-inline-flex text-decoration-none rounded">Rejected Requests</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <hr />
                    <div className="dropdown px-2">
                        <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{props.user.username}</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                            <li><a className="dropdown-item" href="/">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="/" onClick={logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }
};

export default Sidebar;