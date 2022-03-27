import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";

function PasswordVaultEdit(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-date-w3-agileits">
                    <label className="pull-left"> Item </label>
                    <Input type="text" name="item" placeholder="Item" required="true" />
                    <label className="pull-left"> Password </label>
                    <Input type="text" name="password" placeholder="Password" required="true" />
                    <label className="pull-left"> Email </label>
                    <Input type="email" name="email" placeholder="Your Email" required=""/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="primary" >Edit</Button>
                <Button onClick={props.onHide}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordVaultEdit;
