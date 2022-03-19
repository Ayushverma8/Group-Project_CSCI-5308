import { useState, useEffect } from 'react';

const useForm = (callback) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        };

        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        delete errors[event.target.name];
    };

    return {
        handleChange,
        handleSubmit,
        values,
        setValues,
        errors,
        setErrors
    }
};

export default useForm;
