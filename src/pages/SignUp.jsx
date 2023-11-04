import { TextField, Box, Button } from "@mui/material";
import style from "../styles/signup.module.css";
import { useState, useContext } from "react";
import Context from "../context/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SignUp() {
  let context = useContext(Context);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirm, setConfirm] = useState("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password === confirm) {
      let data = context.data.find((item) => item.email === email);
      if (data) {
        navigate("/login");
      } else {
        let obj = {};
        obj.name = name;
        obj.email = email;
        obj.password = password;
        obj.todo = [];
        context.data.push(obj);

        let value = localStorage.getItem("users");
        if (value) {
          value = JSON.parse(value);
          value.push(obj);
          localStorage.setItem("users", JSON.stringify(value));
        } else {
          localStorage.setItem("users", JSON.stringify([obj]));
        }

        toast.success("Account Created");
        navigate("/login");
      }
    } else {
      setConfirm("");
      setPassword("");
      toast.error("Confirm password should be correct");
    }
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        Validate
        autoComplete="off"
        className={`${style.SignUp}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={`${style.inside_div}`}>
          <span>Name</span>
          <TextField
            required
            id="outlined-name"
            style={{ width: "60%" }}
            placeholder="Enter your name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={`${style.inside_div}`}>
          <span>Email</span>
          <TextField
            label="Email"
            type="email"
            style={{ width: "60%" }}
            placeholder="abc@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={`${style.inside_div}`}>
          <span>Password</span>

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={{ width: "60%" }}
            placeholder="enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={`${style.inside_div}`}>
          <span>Confirm Password</span>
          <TextField
            id="outlined-password"
            type="password"
            label="Confirm-password"
            placeholder="Enter Password"
            autoComplete="current-password"
            style={{ width: "60%" }}
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default SignUp;
