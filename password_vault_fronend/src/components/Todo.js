import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { ListGroup } from "reactstrap";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { getHeaders } from "../utils/authHelpers";
import CreateTodo from "./CreateTodo";

function Todo() {
    const [todos, setTodos] = useState([]);
    const HIGH_PRIORITY = 0
    const NORMAL_PRIORITY = 1
    const LOW_PRIORITY = 2

    const [showCreateModal, setShowCreateModal] = useState(false);


    const getPriorityClass = (integer) => {
        if (integer == HIGH_PRIORITY) {
            return "danger"
        } else if (integer == NORMAL_PRIORITY) {
            return "warning"
        } else {
            return "success"
        }
    }

    const getTextPriority = (integer) => {
        if (integer == HIGH_PRIORITY) {
            return "High"
        } else if (integer == NORMAL_PRIORITY) {
            return "Normal"
        } else {
            return "Low"
        }
    }

    const getTodos = async () => {
        try {
            let response = await API_CLIENT.get('todo/', {
                headers: getHeaders()
            })
            setTodos(response.data.results);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <ListGroup className="mt-4">
            <SideBar />

            <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse justify-content-center"
                        id="navigation">
                        <a class="navbar-brand" style={{ marginLeft: "-700px" }}
                            href="#"> Todo <FontAwesomeIcon className='ms-2'
                                data-tip="Click to add new todo"
                                onClick={() => setShowCreateModal(true)}
                                icon="fa-solid fa-plus" />
                            <ReactTooltip />
                        </a>
                    </div>
                </div>
            </nav>

            <CreateTodo show={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />

            <div className='col-md-9 offset-3 row mt-5' id="todo">
                <div class="row d-flex justify-content-center container">
                    <div>
                        <div class="card-hover-shadow-2x mb-3 card">
                            <div class="card-header-tab card-header">
                                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <i class="fa fa-tasks"></i>&nbsp;Task List
                                </div>
                            </div>
                            <div class="scroll-area-sm">
                                <perfect-scrollbar class="ps-show-limits">
                                    <div style={{ position: "static" }}
                                        class="ps ps--active-y">
                                        <div class="ps-content">
                                            <ul class=" list-group list-group-flush">
                                                {
                                                    todos.map((item, index) => {
                                                        return (
                                                            <li className="list-group-item">
                                                                <div className={"todo-indicator bg-" + getPriorityClass(item.priority)}></div>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-heading">
                                                                                {item.title}
                                                                                <div className={"badge badge-" + getPriorityClass(item.priority) + " ml-2"} style={{ marginLeft: '3px' }}>{getTextPriority(item.priority)}</div>
                                                                            </div>
                                                                            <div
                                                                                className="widget-subheading pull-left">
                                                                                {item.end_date ? <i>Due by tomorrow</i> : null}
                                                                            </div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <button className="border-0 btn-transition btn btn-outline-success">
                                                                                <i className="fa fa-check"></i>
                                                                            </button>
                                                                            <button className="border-0 btn-transition btn btn-outline-danger">
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </perfect-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ListGroup>
    )
}

export default Todo;