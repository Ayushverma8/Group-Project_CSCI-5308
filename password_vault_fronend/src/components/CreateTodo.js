import { useState } from 'react';
import Modal from 'react-modal'
import Input from './common/Input'
import useForm from '../custom_hooks/useFormHook';

function CreateTodo(props) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width: '40%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const createOrUpdateTodo = () => {

    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(createOrUpdateTodo);

    return (
        <Modal isOpen={props.show} style={customStyles}>
            <h4 className='text-center'><strong>Create new TODO</strong></h4>
            <form>
                <div className='todo-modal-input'>
                    <label><strong>Title</strong></label>
                    <Input name="title" errors={errors} value={values.title} onChange={handleChange} className='form-control' type="text" />
                </div>
                <div className='todo-modal-input'>
                    <label><strong>Priority</strong></label><br />
                    <button className='btn border'> Low</button>
                    <button className='btn border m-2'> Normal</button>
                    <button className='btn border'> High</button>
                    <Input type="hidden" name="priority" errors={errors} value={values.priority}></Input>
                </div>
                <div className='todo-modal-input'>
                    <label><strong>End date</strong></label>
                    <Input name="end_date" errors={errors} value={values.end_date} onChange={handleChange} className='form-control' type="date" />
                </div>
                <div className='todo-modal-input'>
                    <label><strong>Description</strong></label>
                    <textarea name="description" errors={errors} value={values.description} onChange={handleChange} className='form-control' />
                </div>
            </form>
            <div className='pull-right'>
                <button className='btn btn-secondary m-2' onClick={() => props.setShowCreateModal(false)}>Cancel</button>
                <button className='btn btn-primary m-2'>Save</button>
            </div>
        </Modal>
    );
}

export default CreateTodo;