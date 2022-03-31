import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";

function PasswordVault(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-date-w3-agileits">
                    <label className="pull-left"> Website </label>
                    <Input type="text" name="item" value={props.objectData.website_name} placeholder="Website name" required="true" />

                    <label className="pull-left"> URL </label>
                    <Input type="text" name="item" value={props.objectData.website_url} placeholder="website url" required="true" />

                    <label className="pull-left"> Username </label>
                    <Input type="text" name="item" value={props.objectData.website_username} placeholder="website username" required="true" />

                    <label className="pull-left"> Password </label>
                    <Input name="password" type="password" value={props.objectData.password} placeholder="Password" required="true" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onHide(false)}>Close</Button>
                <Button variant="primary" >Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordVault;
