import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function AddNotes  ()  {
  const [name, setName] = useState('');
  const { addNote } = useContext(GlobalContext);
  const history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: uuid(),
      name
    }
    addNote(newNote);
    history("/notes");
  }

  const onChange = (e) => {
    setName(e.target.value);
  }

  return (
    <><div class="sidebar" data-color="white" data-active-color="danger">
    <div class="logo">
        <div class="logo-image-small">
          <img src="../assets/img/user (1).png" class="user-icon"/>
        </div>
      <a href="#" class="simple-text logo-normal">
      <label id="lbluserid" style={{fontWeight:"bolder"}}>Manasvi Sharma</label>
      </a>
    </div>
    <div class="sidebar-wrapper ">
      <ul class="nav">
        <li>
          <a href="/">
            <i class="nc-icon nc-bank logo-color"></i>
            <p>Dashboard</p>
          </a>
        </li>
        <li  >
          <a href="/notes">
            <i class="nc-icon nc-bullet-list-67 logo-color"></i>
            <p>Notes</p>
          </a>
        </li>
        <li  >
          <a href="/notes">
            <i class="nc-icon nc-box-2 logo-color"></i>
            <p>Vault</p>
          </a>
        </li>
        <li >
          <a href="./map.html">
            <i class="nc-icon nc-bookmark-2 logo-color"></i>
            <p>Todo</p>
          </a>
        </li>
        <li >
          <a href="./notifications.html">
            <i class="nc-icon nc-button-power logo-color"></i>
            <p>Logout</p>
          </a>
        </li>
        <li >
          <a href="./user.html">
            <i class="nc-icon nc-simple-remove logo-color"></i>
            <p>Delete Account</p>
          </a>
        </li>
        
      </ul>
    </div>
  </div><Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Note</Label>
          <Input type="text" value={name} onChange={onChange} name="note" placeholder="Enter Note" required style={{
        border: '3px solid #0e3285', 
   }}></Input>
        </FormGroup>
        <Button type="submit" onclick="/notes">Submit</Button>
        <Link to="/notes" className="btn btn-danger ml-2" style={{marginLeft: "10%"}}>Cancel</Link>
      </Form></>
  )
}

export default AddNotes;
