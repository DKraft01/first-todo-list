//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import { MdEdit, MdCheck } from "react-icons/md";

function App() {
  const [Task, setTask] = useState("");
  const [TaskList, setTaskList] = useState([]);
  const [idList, setidList] = useState([]);
  const [EditInput, setEditInput] = useState("");
  const [EditSubmit, setEditSubmit] = useState();
  const [ToogleEdit, setToogleEdit] = useState(false);

  const change = (e) => {
    setTask(e.target.value);
  };

  const AddTask = (e) => {
    e.preventDefault();
    const Saved = [...TaskList, Task];
    setTaskList(Saved);
    IdGenerator();

    setTask("");
  };

  const edit = (e) => {
    setEditInput(e);
    setToogleEdit(true);
  };
  const submitEdit = (e) => {
    e.preventDefault();
    let editedList = TaskList;
    editedList.splice(EditSubmit, 1, EditInput);
    setTaskList(editedList);
    setEditInput("");
    setToogleEdit(false);
  };

  const idSelector = (e) => {
    setEditSubmit(e);
  };

  const IdGenerator = () => {
    let id = Math.round(Math.random() * 100);

    let check = idList.includes(id);

    while (check) {
      id = Math.round(Math.random() * 100);
      check = idList.includes(id);
    }

    setidList([...idList, id]);
  };

  const idDelete = (ind) => {
    let idSelection = idList.filter((e, i) => i !== ind);
    let items = TaskList.filter((e, i) => i !== ind);
    setTaskList(items);
    setidList(idSelection);
  };

  return (
    <div className="App">
      <h1>To-do App</h1>

      <div className="Content">
        {TaskList.map((e, i) => (
          <Tasks
            ed={edit}
            ind={i}
            key={idList[i]}
            id={idList[i]}
            taskItem={e}
            passID={idDelete}
            idselec={idSelector}
          ></Tasks>
        ))}
      </div>

      <form onSubmit={(e) => AddTask(e)}>
        <input value={Task} type={"text"} onChange={change}></input>
        <button type="submit">Add</button>
      </form>
      {ToogleEdit ? (
        <Edit submitEdit={submitEdit} value={EditInput} changing={edit}></Edit>
      ) : null}
    </div>
  );
}

function Tasks(props) {
  return (
    <div>
      <div className="List">{props.taskItem}</div>
      <MdEdit
        onClick={() => {
          props.ed(props.taskItem);
          props.idselec(props.ind);
        }}
        style={{ cursor: "pointer" }}
      />
      <MdCheck
        style={{ cursor: "pointer" }}
        onClick={() => props.passID(props.ind)}
      />
    </div>
  );
}

function Edit(props) {
  return (
    <>
      <div className="layer"></div>
      <div className="EditWindow">
        <form onSubmit={(e) => props.submitEdit(e)}>
          <input
            value={props.value}
            onChange={(e) => props.changing(e.target.value)}
          ></input>
          <button>Edit</button>
        </form>
      </div>
    </>
  );
}

export default App;
