import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import API_CLIENT from '../api/axiosClient';

function PasswordVault(props) {
    const showPassword = () => {
        var x = document.getElementById("my-pass");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const createOrUpdatePassWord = async () => {
        try {
            if (!props.objectData.id) {
                await API_CLIENT.post('vault/', values);
            } else {
                await API_CLIENT.patch(`vault/${props.objectData.id}/`, values);
            }

            props.getPasswords();
            props.onHide();
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const deletePassword = async () => {
        await API_CLIENT.delete(`vault/${props.objectData.id}/`);
        props.getPasswords();
        props.onHide();
    }

    useEffect(() => {
        if (props.objectData) {
            setValues(props.objectData)
        }
    }, [props.show])

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(createOrUpdatePassWord);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.objectData.id ? 'Update' : 'Add'} Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.objectData.id ?
                        <div className='d-flex justify-content-end'>
                            <Button className='btn-danger' onClick={() => deletePassword()}>Delete</Button>
                        </div> : null
                }

                <div className="form-date-w3-agileits">
                    <label className="pull-left"> Website </label>
                    <Input type="text" name="website_name" onChange={handleChange} value={values.website_name} placeholder="Website name" required="true" />

                    <label className="pull-left"> URL </label>
                    <Input type="text" name="website_url" onChange={handleChange} value={values.website_url} placeholder="website url" required="true" />

                    <label className="pull-left"> Username </label>
                    <Input type="text" name="website_username" onChange={handleChange} value={values.website_username} placeholder="website username" required="true" />

                    <label className="pull-left"> Password </label>
                    <Input name="password" id="my-pass" type="password" onChange={handleChange} value={values.password} placeholder="Password" required="true" />
                    <div className='d-flex' style={{ marginTop: "-10px" }}>
                        <input type="checkbox" onClick={showPassword} /><p style={{ marginBottom: '-15px', transform: "translate(10px, -3px)" }}>Show password</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-secondary' onClick={() => props.onHide()}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordVault;
