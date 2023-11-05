import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../styles/edit.module.css";
import { toast } from "react-toastify";

function Todo() {
  let navigate = useNavigate();
  let [todo, setTodo] = useState([]);
  let [text, setText] = useState("");
  let [due, setDue] = useState("");
  let [priority, setPriority] = useState("");
  let [edit, setEdit] = useState(false);
  //for edit
  let [index, setIndex] = useState(-1);

  useEffect(() => {
   
    let login = localStorage.getItem("login");
    let data = localStorage.getItem("users");
    if (login) {
      login = JSON.parse(login);
      if (data) {
        data = JSON.parse(data);
        let value = data.find((item) => item.email === login.email);
        if (value) {
          setTodo([...value.todo]);
        }
      }
    } else {
      navigate("/error");
    }
  }, []);

  useEffect(() => {
    if (todo.length !== 0) {
      let users = localStorage.getItem("users");
      users = JSON.parse(users);
      if (users) {
        let login = localStorage.getItem("login");
        login = JSON.parse(login);
        users = users.map(function (item) {
          if (item.email === login.email) {
            item.todo = [...todo];
          }
          return item;
        });

        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }, [todo]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodo([
      ...todo,
      { desc: text, due: due, priority: priority, completed: false },
    ]);
    setText("");
    setPriority("");
    toast.success("Todo added Successfully");
  }

  function markCompleted(i) {
    todo = todo.map((item, index) => {
      if (index === i) {
        item.completed = !item.completed;
      }

      return item;
    });

    setTodo(todo);

    toast.info("Todo Marked as Completed");
  }

  function handleDelete(i) {
    todo = todo.filter((item, index) => i !== index);
    setTodo(todo);
    toast.success("Todo Deleted Successfully");
  }

  function Edit(i) {
    setIndex(i);
    setEdit(!edit);
  }

  function handleEdit(e) {
    e.preventDefault();
    if (index !== -1) {
      todo = todo.map((item, i) => {
        if (index === i) {
          item.desc = text;
          item.due = due;
          item.priority = priority;
        }

        return item;
      });

      setTodo(todo);
      setText("");
      setIndex(-1);
      setPriority("");
      setEdit(!edit);
      toast.success("Todo Edit Successfully");
    } else {
      toast.error("Error getting in Edit");
    }
  }

  return (
    <>
      {edit ? (
        <>
          <div className={`${style.container} container`}>
            <div className="h3 text-center">Let's Edit your Todo</div>
            <form onSubmit={(e) => handleEdit(e)}>
              <div className="row my-4">
                <div className="col-4">
                  <label>Description:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    className="form form-control"
                  ></input>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-4">
                  <label>Due Date:</label>
                </div>
                <div className="col-8">
                  <input
                    type="datetime-local"
                    onChange={(e) => setDue(e.target.value)}
                    className="form form-control"
                  ></input>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-4">
                  <label>Priority:</label>
                </div>
                <div className="col-8">
                  <select
                    onChange={(e) => setPriority(e.target.value)}
                    className="form form-control"
                  >
                    <option value={"Low"}>Low</option>
                    <option value={"Medium"}>medium</option>
                    <option value={"High"}>High</option>
                  </select>
                </div>
              </div>

              <div className="row my-4">
                <button type="submit" className="btn btn-primary col-12">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        ""
      )}

      <div className={"container p-5"}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-3">
              <input
                type="text"
                className="form form-control"
                onChange={(e) => setText(e.target.value)}
                placeholder="write your todos..."
                required
                value={text}
              ></input>
            </div>
            <div className="col-3 py-1">
              <input
                type="datetime-local"
                className="form form-control"
                required
                onChange={(e) => setDue(e.target.value)}
              ></input>
            </div>
            <div
              className="col-3"
              onChange={(e) => setPriority(e.target.value)}
            >
              <select className="form form-control">
                <option value={"Low"}>Low</option>
                <option value={"Medium"}>medium</option>
                <option value={"High"}>High</option>
              </select>
            </div>
            <div className="col-3">
              <button className="btn btn-primary" type="submit">
                Add Your Todo
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="container px-5 overflow-scroll"
        style={{ height: "65vh", backgroundColor: "bisque" }}
      >
        <div className={`${style.header}`}>
          <div>Description</div>

          <div style={{ marginLeft: "-5%" }}>Due Date</div>

          <div>Priority</div>

          <div>Status</div>

          <div style={{ width: "5%", paddingLeft: "4%" }}>Editing</div>

          <div style={{ width: "5%", paddingLeft: "4%" }}>Deleting</div>
        </div>
        {todo.map((item, index) => (
          <div key={index} className="row border border-primary p-3 my-3">
            <div className="col-2 border border-primary text-center">
              {item.desc}
            </div>
            <div className="col-2">{item.due}</div>
            <div className="col-2 fw-bold border border-danger text-center">
              {item.priority}
            </div>
            {item.completed ? (
              <div className="col-2">
                <button className="btn btn-info" disabled>
                  {" "}
                  Completed
                </button>
              </div>
            ) : (
              <div className="col-3">
                <button
                  className="btn btn-primary"
                  onClick={() => markCompleted(index)}
                >
                  Mark As Completed
                </button>
              </div>
            )}
            <div className="col-2">
              <button className="btn btn-success" onClick={() => Edit(index)}>
                {" "}
                Edit{" "}
              </button>
            </div>
            <div className="col-1">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
