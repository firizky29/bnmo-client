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

const Transactions = (props: any) => {
    const [transactions, settransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const { transaction_status } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/transactions${transaction_status ? "/" + transaction_status : ""}?page=${currentPage}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                settransactions(data.data);
                setTotalPages(data.last_page);
            } else {
                settransactions([]);
            }
        })();
    }, [limit, transaction_status]);

    const onPageChange = (data: any) => {
        const page = data.selected + 1;
        setCurrentPage(page);
        (async () => {
            const response = await fetch(`${API_URL}/transactions${transaction_status ? "/" + transaction_status : ""}?&page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                settransactions(data.data);

            } else {
                settransactions([]);
            }
        }
        )();
    }

    const onChangeLimit = (e: any) => {
        setLimit(e);
    }


    const updateUser = async (id: string, action: string) => {
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            body: JSON.stringify({ transaction_status: action }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'PUT'
        });

        if (response.status === 200) {
            const response = await fetch(`${API_URL}/transactions${transaction_status ? "/" + transaction_status : ""}?page=${currentPage}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                settransactions(data.data);

            } else {
                settransactions([]);
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
                                <h3 className="card-title">Requests</h3>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th >
                                                Transaction ID
                                            </th>
                                            <th >
                                                Requester Username
                                            </th>
                                            <th >
                                                Requester Current Balance
                                            </th>
                                            <th>
                                                Amount
                                            </th>
                                            <th>
                                                Transaction Status
                                            </th>
                                            {
                                                (() => {
                                                    if (!transaction_status) {
                                                        return;
                                                    } else if (transaction_status === 'pending') {
                                                        return (
                                                            <th>
                                                                Action
                                                            </th>
                                                        );
                                                    } else if (transaction_status === 'accepted' || transaction_status === 'rejected') {
                                                        return <th>Timestamp</th>
                                                    }
                                                }
                                                )()
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(transactions)
                                            ? transactions.map((transaction: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {transaction.id}
                                                        </td>
                                                        <td>
                                                            {transaction.debitor.username==='admin'?transaction.creditor.username:transaction.debitor.username}
                                                        </td>
                                                        <td>
                                                            {transaction.debitor.username==='admin'?
                                                            "Rp"+Intl.NumberFormat('id-ID').format(transaction.creditor.balance):
                                                            "Rp"+Intl.NumberFormat('id-ID').format(transaction.debitor.balance)}
                                                        </td>
                                                        <td>
                                                            {
                                                                (
                                                                    () => {
                                                                        if (transaction.debitor.username === 'admin') {
                                                                            return (
                                                                                <h5><span className="badge bg-danger">{"-Rp"+Intl.NumberFormat('id-ID').format(transaction.amount)}</span></h5>
                                                                            );
                                                                        } else{
                                                                            return (
                                                                                <h5><span className="badge bg-success">{"+Rp"+Intl.NumberFormat('id-ID').format(transaction.amount)}</span></h5>
                                                                            );
                                                                        }
                                                                    }
                                                                )()
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                (() => {
                                                                    if (transaction.transaction_status === 'accepted') {
                                                                        return <span className="badge badge-success">Accepted</span>
                                                                    } else if (transaction.transaction_status === 'pending') {
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
                                                                    if (!transaction_status) {
                                                                        return;
                                                                    } else if (transaction_status === 'pending') {
                                                                        return (
                                                                            <div className="btn-group">
                                                                                <button type="button" className="btn btn-success btn-sm" onClick={() => { updateUser(transaction.id, "accepted") }}>
                                                                                    <i className="fas fa-check"></i>
                                                                                </button>
                                                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => { updateUser(transaction.id, "rejected") }}>
                                                                                    <i className="fas fa-times"></i>

                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    } else if (transaction_status === 'accepted' || transaction_status === 'rejected') {
                                                                        return <span className="badge badge-secondary">{transaction.updated_at}</span>
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
};

export default Transactions;