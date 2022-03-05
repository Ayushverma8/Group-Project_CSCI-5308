import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

function NotesList  ()  {
  const { notes, removeNote } = useContext(GlobalContext);

  return (
    <ListGroup className="mt-4">
      <div class="sidebar" data-color="white" data-active-color="danger">
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
            <a href="/home">
              <i class="nc-icon nc-bank logo-color"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li  >
          <a href="/notes">
            <i class="nc-icon nc-box-2 logo-color"></i>
            <p>Vault</p>
          </a>
        </li>
          <li  >
            <a href="/notes">
              <i class="nc-icon nc-bullet-list-67 logo-color"></i>
              <p>Notes</p>
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
    </div>
      {notes.length > 0 ? (
        <>
          {notes.map(note => (
            <ListGroupItem className="" key={note.id}>
              <strong>{note.name}</strong>
              <div className="ml-auto pull-right">
                <Link to={`/edit/${note.id}`} className="btn btn-warning mr-3" style={{color:"#f8f9fa",backgroundColor: "#23314e",borderColor:"#23314e"}}>Edit</Link>
                <Button onClick={() => removeNote(note.id)} color="danger">Delete</Button>
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
          <h4 className="text-center">No Notes</h4>
        )}
    </ListGroup>
  )
}

export default NotesList;
