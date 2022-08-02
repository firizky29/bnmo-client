import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = (props: any) => {
    if(!props.isLoggedIn) {
        return <Navigate replace to="/login" />
    } else{
        return (
            <div>
                {props.user.name}
            </div>
        );
    }
};

export default Home;