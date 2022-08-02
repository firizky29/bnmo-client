import React from 'react';
import Alert from 'react-bootstrap/Alert';

const SuccessAlert = (props: any) => {
    const onCloseAlert = () => {
        props.setShow(false);
        props.setAlert('');
    }
    return (
        <div className="alert-wrapper row">
            <Alert className="fs-6 col-md-5 m-auto mt-3" variant="danger" onClose={onCloseAlert} dismissible show={props.show}>
                <label>{props.alert}</label>
            </Alert>
        </div>
    );
};

export default SuccessAlert;