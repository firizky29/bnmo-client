import React, { useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { API_EXCHANGE_RATE, API_KEY } from '../config';

const Home = (props: any) => {
    const [symbols, setSymbols] = React.useState([]);
    const [symbol, setSymbol] = React.useState('IDR');

    useEffect(() => {
        if(API_KEY){
            var myHeaders = new Headers();
            myHeaders.append("apikey", API_KEY);

            fetch("https://api.apilayer.com/exchangerates_data/symbols", 
                {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                }
            )
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }, []);

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
                                    <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio" />
                                    <label htmlFor="customRadio1" className="custom-control-label">Debit</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" />
                                    <label htmlFor="customRadio2" className="custom-control-label">Withdraw</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="btn-group align-self-center align-top mr-2">
                                        <DropdownButton
                                            title={symbol}
                                            id="dropdown-menu-align-right"
                                            variant="light"
                                            onSelect={(eventKey: any) => setSymbol(eventKey)}
                                        >
                                            {
                                                Array.isArray(symbols) ?
                                                    symbols.map((symbol: any, index: number) => {
                                                        return <Dropdown.Item eventKey={symbol}>{symbol}</Dropdown.Item>
                                                    }) : null
                                            }
                                        </DropdownButton>
                                    </div>
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