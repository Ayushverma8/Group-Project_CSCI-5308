import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import API_CLIENT from '../api/axiosClient';
import AsyncSelect from 'react-select/async'
import ReactTooltip from "react-tooltip";

function PasswordVault(props) {
    const [sharedWithUsers, setSharedWithUsers] = useState([]);

    const showPassword = () => {
        var x = document.getElementById("my-pass");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const createOrUpdatePassWord = async () => {
        var url = values['website_url'];

        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }

        values['website_url'] = url;

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
            setValues(props.objectData);

            var data = props.objectData.shared_with
            var options = [];

            for (var i in data) {
                options.push({
                    value: data[i].id,
                    label: data[i].full_name
                });
            }

            setSharedWithUsers(options);
        }
    }, [props.show])

    const loadOptions = async (string) => {
        try {
            let response = await API_CLIENT.get(`users/?query=${string}`);
            let data = response.data.results
            var options = [];

            for (var i in data) {
                options.push({
                    value: data[i].id,
                    label: data[i].full_name
                });
            }

            return options;
        } catch (err) {
            console.log(err)
        }
    }

    const handleOptionSelect = (data) => {
        setSharedWithUsers(data);
        values['shared_with_ids'] = data.map((item) => item.value)
    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(createOrUpdatePassWord);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ cursor: values.owner != undefined && !values.owner ? 'not-allowed' : 'default' }}
            data-tip={values.owner != undefined && !values.owner ? "It is shared with you by someone so you cannot change it" : ""}
        ><ReactTooltip />
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.objectData.id ? 'Update' : 'Add'} Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ pointerEvents: values.owner != undefined && !values.owner ? 'none' : 'all' }}>
                {
                    props.objectData.id ?
                        <div className='d-flex justify-content-end'>
                            <Button className='btn-danger' onClick={() => deletePassword()}>Delete</Button>
                        </div> : null
                }

                <div className="form-date-w3-agileits">
                    <label className="pull-left"> Website </label>
                    <Input type="text" name="website_name" onChange={handleChange} errors={errors} value={values.website_name} placeholder="Website name" required="true" />

                    <label className="pull-left"> URL </label>
                    <Input type="text" name="website_url" onChange={handleChange} errors={errors} value={values.website_url} placeholder="website url" required="true" />

                    <label className="pull-left"> Username </label>
                    <Input type="text" name="website_username" onChange={handleChange} errors={errors} value={values.website_username} placeholder="website username" required="true" />

                    <div className="row">
                        <label className="pull-left"> Shared with </label>
                        <AsyncSelect
                            isMulti={true}
                            cacheOptions={true}
                            value={sharedWithUsers}
                            loadOptions={loadOptions}
                            onChange={handleOptionSelect}
                        />
                    </div>

                    <label className="pull-left mt-3"> Password </label>
                    <Input name="password" id="my-pass" type="password" errors={errors} onChange={handleChange} value={values.password} placeholder="Password" required="true" />
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
