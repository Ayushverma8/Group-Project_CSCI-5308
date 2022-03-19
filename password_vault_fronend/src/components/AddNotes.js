import React, { useState, useContext, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import SideBar from './SideBar';
import Input from './common/Input';

function AddNotes() {
	const [title, setTitle] = useState();
	const [text, setText] = useState();

	return (
		<div className="container col-md-12">
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

			<div id="editor" className='mt-5'>
				<label>Title</label>
				<Input type='text'></Input>
				<ReactQuill theme='snow' value={text} onChange={setText}></ReactQuill>
				<div className='pull-right'>
					<button className='btn btn-secondary m-1'> Cancel </button>
					<button className='btn btn-primary m-1'> Create </button>
				</div>
			</div>
		</div>
	)
}

export default AddNotes;
