import React, { useEffect, useState } from 'react';
import {
	ListGroup,
} from "reactstrap";
import SideBar from "./SideBar";
import API_CLIENT from "../api/axiosClient";
import { getHeaders } from '../utils/authHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import ReactQuill from 'react-quill'
import Input from './common/Input';
import 'react-quill/dist/quill.snow.css';
import useForm from '../custom_hooks/useFormHook';


function Notes() {
	const [notes, setNotes] = useState([]);
	const [addNotesPage, setAddNotes] = useState(false);
	const [text, setText] = useState();
	const [beingEditedId, setBeingEditedId] = useState();

	const getNotes = async () => {
		try {
			let response = await API_CLIENT.get('notes/', {
				headers: getHeaders()
			})
			setNotes(response.data.results)
			setAddNotes(false)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(async () => {
		getNotes();
	}, [])

	const deleteNote = async (noteId) => {
		try {
			await API_CLIENT.delete(`notes/${noteId}/`, {
				headers: getHeaders(),
			})

			getNotes();
		} catch (err) {
			console.log(err)
		}
	}

	const openEditNote = async (text, title, id) => {
		setAddNotes(true);
		setText(text);
		// Title is managed by useForm since need to show generic error below it.
		setValues({ title: title });
		setBeingEditedId(id);
	}

	const createOrUpdateNote = async () => {
		let data = {
			title: values.title,
			text: text
		}

		try {
			if (beingEditedId) {
				await API_CLIENT.put(`notes/${beingEditedId}/`, data, {
					headers: getHeaders()
				});
			} else {
				await API_CLIENT.post('notes/', data, {
					headers: getHeaders()
				});
			}

			getNotes();
			setText('');
			setValues({});
		} catch (err) {
			console.log(err)
			setErrors(err.response.data)
		}
	}

	const cancelClicked = () => {
		setValues({});
		setBeingEditedId();
		setText();
		setAddNotes(false);
	}

	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(createOrUpdateNote);

	return (
		<ListGroup className="mt-4">
			<SideBar />

			<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
				<div class="container-fluid">
					<div class="collapse navbar-collapse justify-content-end" id="navigation">
						<a class="navbar-brand" style={{ paddingRight: "710px" }} href="#">Notes {addNotesPage ? null : <FontAwesomeIcon className='ms-2' data-tip="Click to add new notes" onClick={() => setAddNotes(true)} icon="fa-solid fa-plus" />}
							<ReactTooltip />
						</a>

						<form>
							<div class="input-group no-border">
								<input type="text" value="" class="form-control" placeholder="Search..." />
								<div class="input-group-append">
									<div class="input-group-text">
										<i class="nc-icon nc-zoom-split"></i>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</nav>

			<div className='col-md-9 offset-3 row mt-5'>
				{!addNotesPage ?
					notes.map((item, index) => {
						return (
							<div class="card col-md-4 border" style={index % 3 == 0 ? { marginLeft: '-25px' } : {}}>
								<h5 class="card-header">{item.title}</h5>
								<div class="card-body">
									<p class="card-text" dangerouslySetInnerHTML={{ __html: item.text }}></p>
									<a href="#" class="btn btn-primary" style={{ minWidth: '100px', marginRight: '3px' }} onClick={() => openEditNote(item.text, item.title, item.id)}>Edit</a>
									<a href="#" class="btn btn-danger" style={{ minWidth: '100px' }} onClick={() => deleteNote(item.id)}>Delete</a>
								</div>
							</div>
						)
					}) :
					<div id="editor">
						<label className='pull-left font-weight-bold'>Title</label>
						<Input type='text' name="title" errors={errors} value={values.title} onChange={handleChange}></Input>
						<label className='pull-left font-weight-bold'>Content</label>
						<ReactQuill className='mt-5' theme='snow' value={text} onChange={setText}></ReactQuill>

						<div className='pull-right mt-2'>
							<button className='btn btn-secondary m-1' onClick={() => cancelClicked()}> Cancel </button>
							<button className='btn btn-primary m-1' onClick={handleSubmit}> {beingEditedId ? 'Update' : 'Create'} </button>
						</div>
					</div>
				}

			</div>
		</ListGroup>
	)
}

export default Notes;
