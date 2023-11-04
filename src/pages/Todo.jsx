import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Todo() {
  let navigate = useNavigate();
  let [todo, setTodo] = useState([]);
  let [text, setText] = useState("");
  let [due,setDue] = useState("");

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

    setTodo([...todo, { desc: text,due : due, completed: false }]);

    // let users = localStorage.getItem("users");
    // users = JSON.parse(users);
    // if (users) {
    //   let login = localStorage.getItem("login");
    //   login = JSON.parse(login);
    //   users = users.map(function (item) {
    //     if (item.email === login.email) {
    //       item.todo = [...todo];
    //     }
    //     return item;
    //   });

    //   localStorage.setItem("users", JSON.stringify(users));

    setText("");
  }

  function markCompleted(i){
    todo = todo.map((item,index) => {
      if (index === i){
        item.completed = !item.completed;
      }

      return item;
    });

    setTodo(todo);
  }

  function handleDelete(i){
    todo = todo.filter((item,index) => i !== index);
    setTodo(todo);
  }

  return (
    <>
      <div className={"container p-5"}>
        <form onSubmit={(e) => handleSubmit(e)} >
          <div className="row">
            <div className="col-5">
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
              <input type="datetime-local" required onChange={(e) => setDue(e.target.value)}></input>
            </div>
            <div className="col-4">
              <button className="btn btn-primary" type="submit">
                Add Your Todo
              </button>
            </div>
          </div>
        </form>
        </div>

        <div className="container overflow-scroll" style={{height : "65vh"}}>
        
        {todo.map((item, index) => (
          <div key={index} className="row my-3">
            <div className="col-2">{item.desc}</div>
            <div className="col-3">{item.due}</div>
            {item.completed ? (
              <div className="col-4">
                <button className="btn btn-info" disabled>
                  {" "}
                  Completed
                </button>
              </div>
            ) : (
                <div className="col-4">
                <button className="btn btn-primary" onClick={() => markCompleted(index)}>Mark As Completed</button>
                </div>
            )}
            <div className="col-2">
              <button className="btn btn-success"> Edit </button>
            </div>
            <div className="col-1">
              <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
        </div>
   
    </>
  );
}

export default Todo;
