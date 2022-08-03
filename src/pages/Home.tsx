import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = (props: any) => {
    if (!props.isLoggedIn) {
        return <Navigate replace to="/login" />
    } else {
        return (
            <main className="m-auto px-md-4">
                <div className="d-flex justify-content-around flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="card card-success">
                        <div className="card-header">
                            <h3 className="card-title">Request</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group d-flex justify-content-around">
                                <div className="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio" checked />
                                    <label htmlFor="customRadio1" className="custom-control-label">Debit</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" />
                                    <label htmlFor="customRadio2" className="custom-control-label">Withdraw</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                        <span>$ </span>
                                    </button>
                                </div>
                                <input type="text" className="form-control" />
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>

                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </div>

                    <div className="card card-warning">
                        <div className="card-header">
                            <h3 className="card-title">Transfer</h3>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                        <span>$ </span>
                                    </button>
                                </div>
                                <input type="text" className="form-control" />
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>

                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </div>
                </div>
            </main>

        );
    }
};

export default Home;