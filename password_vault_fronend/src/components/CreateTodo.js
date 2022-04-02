import { useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import Input from './common/Input'
import useForm from '../custom_hooks/useFormHook';
import API_CLIENT from '../api/axiosClient';

function CreateTodo(props) {
    const HIGH_PRIORITY = 0
    const NORMAL_PRIORITY = 1
    const LOW_PRIORITY = 2

    const createOrUpdateTodo = async () => {
        try {
            if (values.id) {
                await API_CLIENT.patch(`todo/${values.id}/`, values);
            } else {
                await API_CLIENT.post('todo/', values);
            }

            props.getTodos();
            props.closeTodoModal(false);
            setValues({});
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const setPriority = async (e, priority) => {
        if (e) {
            e.preventDefault();
        }

        await setTimeout(300)

        values['priority'] = priority;
        setValues(values)

        const high_priority_btn = document.getElementById('high-priority')
        const low_priority_btn = document.getElementById('low-priority')
        const normal_priority_btn = document.getElementById('normal-priority')

        if (priority == HIGH_PRIORITY) {
            high_priority_btn.classList.add('btn-danger')
            low_priority_btn.classList.remove('btn-success')
            normal_priority_btn.classList.remove('btn-warning')
        } else if (priority == NORMAL_PRIORITY) {
            high_priority_btn.classList.remove('btn-danger')
            low_priority_btn.classList.remove('btn-success')
            normal_priority_btn.classList.add('btn-warning')
        } else {
            high_priority_btn.classList.remove('btn-danger')
            low_priority_btn.classList.add('btn-success')
            normal_priority_btn.classList.remove('btn-warning')
        }
    }

    useEffect(() => {
        if (props.objToUpdate) {
            setValues(props.objToUpdate)
            values['id'] = props.objToUpdate.id
            setPriority(null, props.objToUpdate.priority)
        }
    }, [props.show])

    const closeTodoModal = () => {
        setValues({});
        props.closeTodoModal();
    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(createOrUpdateTodo);

    return (
        <Modal show={props.show} id="todo-modal">
            <h4 className='text-center'><strong>{values.id ? 'Update' : 'Create'} TODO</strong></h4>
            <form>
                <div className='todo-modal-input'>
                    <label><strong>Title</strong></label>
                    <Input name="title" errors={errors} value={values.title} onChange={handleChange} className='form-control' type="text" />
                </div>
                <div className='todo-modal-input'>
                    <label><strong>Priority</strong></label><br />
                    <button id='low-priority' className='btn border' onClick={(e) => setPriority(e, LOW_PRIORITY)}> Low</button>
                    <button id='normal-priority' className='btn border m-2' onClick={(e) => setPriority(e, NORMAL_PRIORITY)}> Normal</button>
                    <button id='high-priority' className='btn border' onClick={(e) => setPriority(e, HIGH_PRIORITY)}> High</button>
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
            <div className='pull-right mt-2 mb-2'>
                <button className='btn btn-primary m-2' onClick={(e) => handleSubmit()}>Save</button>
                <button className='btn btn-secondary m-2' onClick={() => closeTodoModal()}>Cancel</button>
            </div>
        </Modal>
    );
}

export default CreateTodo;