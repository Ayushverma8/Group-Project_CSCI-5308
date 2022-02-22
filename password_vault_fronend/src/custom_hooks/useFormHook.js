import { useState, useEffect } from 'react';

const useForm = (callback) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length == 0) {
            callback();
        }
    }, [isSubmitting]);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        };

        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        delete errors[event.target.name];
        setIsSubmitting(false)
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
