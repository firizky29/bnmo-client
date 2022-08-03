import React, { useEffect, useState } from 'react';
import "admin-lte/plugins/fontawesome-free/css/all.min.css"
import "admin-lte/dist/css/adminlte.min.css"
import "admin-lte/plugins/jquery/jquery.min.js"
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "admin-lte/dist/js/adminlte.min.js"
import { API_URL } from '../config';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Navigate, useParams } from 'react-router-dom';

const Users = (props: any) => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState("10");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { verification_status } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/users${verification_status ? "/" + verification_status : ""}?limit=${limit}&search=${search}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setUsers(data.data);
                setTotalPages(data.last_page);
            } else {
                setUsers([]);
            }
        })();
    }, [limit, search, verification_status]);

    const onPageChange = (data: any) => {
        const page = data.selected + 1;
        setCurrentPage(page);
        (async () => {
            const response = await fetch(`${API_URL}/users${verification_status ? "/" + verification_status : ""}?search=${search}&page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setUsers(data.data);

            } else {
                setUsers([]);
            }
        }
        )();
    }

    const onChangeLimit = (e: any) => {
        setLimit(e);
    }

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value);
        setCurrentPage(1);

    }

    const onSubmitSearch = (e: any) => {
        e.preventDefault();
        setCurrentPage(1);
    }

    const updateUser = async (id: string, action: string) => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            body: JSON.stringify({ verification_status: action }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'PUT'
        });

        if (response.status === 200) {
            const response = await fetch(`${API_URL}/users${verification_status ? "/" + verification_status : ""}?search=${search}&page=${currentPage}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setUsers(data.data);

            } else {
                setUsers([]);
            }
        }
    }


    if (props.isLoggedIn && props.user.is_admin) {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-md-block">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Users</h3>

                                <div className="card-tools">
                                    <div className="input-group input-group-sm">
                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" onChange={onChangeSearch} />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-default" onClick={onSubmitSearch}>
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th >
                                                User ID
                                            </th>
                                            <th >
                                                Name
                                            </th>
                                            <th>
                                                Username
                                            </th>
                                            <th>
                                                Identification Card
                                            </th>
                                            <th className="text-center">
                                                Verification Status
                                            </th>
                                            {
                                                (() => {
                                                    if (!verification_status) {
                                                        return;
                                                    } else if (verification_status === 'pending') {
                                                        return (
                                                            <th>
                                                                Action
                                                            </th>
                                                        );
                                                    } else if (verification_status === 'verified' || verification_status === 'rejected') {
                                                        return <th>Timestamp</th>
                                                    }
                                                }
                                                )()
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(users)
                                            ? users.map((user: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {user.id}
                                                        </td>
                                                        <td>
                                                            {user.name}
                                                        </td>
                                                        <td>
                                                            {user.username}
                                                        </td>
                                                        <td>
                                                            <img src={user.ktp_image} alt="" className='img-thumbnail' />
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                (() => {
                                                                    if (user.verification_status === 'verified') {
                                                                        return <span className="badge badge-success">Verified</span>
                                                                    } else if (user.verification_status === 'pending') {
                                                                        return <span className="badge badge-secondary">Pending</span>
                                                                    } else {
                                                                        return <span className="badge badge-danger">Rejected</span>
                                                                    }
                                                                }
                                                                )()
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                (() => {
                                                                    if (!verification_status) {
                                                                        return;
                                                                    } else if (verification_status === 'pending') {
                                                                        return (
                                                                            <div className="btn-group">
                                                                                <button type="button" className="btn btn-success btn-sm" onClick={() => { updateUser(user.id, "verified") }}>
                                                                                    <i className="fas fa-check"></i>
                                                                                </button>
                                                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => { updateUser(user.id, "rejected") }}>
                                                                                    <i className="fas fa-times"></i>

                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    } else if (verification_status === 'verified' || verification_status === 'rejected') {
                                                                        return <span className="badge badge-secondary">{user.updated_at}</span>
                                                                    }
                                                                }
                                                                )()
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            }) : null}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer clearfix ms-auto d-flex">
                                <div className="align-self-center m-0 p-0">
                                    <p className="font-weight-light m-0 mr-2">Rows per page: </p>
                                </div>
                                <div className="btn-group align-self-center align-top mr-2">
                                    <DropdownButton
                                        title={limit}
                                        id="dropdown-menu-align-right"
                                        variant="light"
                                        onSelect={onChangeLimit}
                                    >
                                        <Dropdown.Item eventKey="10" active={limit === "10"}>10</Dropdown.Item>
                                        <Dropdown.Item eventKey="15" active={limit === "15"}>15</Dropdown.Item>
                                        <Dropdown.Item eventKey="20" active={limit === "20"}>20</Dropdown.Item>
                                        <Dropdown.Item eventKey="25" active={limit === "25"}>25</Dropdown.Item>
                                        <Dropdown.Item eventKey="30" active={limit === "30"}>30</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className="align-middle p-0 m-0">
                                    <ReactPaginate
                                        previousLabel={"< Prev"}
                                        nextLabel={"Next >"}
                                        breakLabel={"..."}
                                        pageCount={totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={onPageChange}
                                        containerClassName={"pagination justify-content-center m-0"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                        forcePage={currentPage - 1}
                                    />
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        )
    }
    else{
        if(props.isLoggedIn){
            return <Navigate replace to='/' />
        }
        else{
            return <Navigate replace to='/login' />
        }
    }
}

export default Users;

