import { useContext, useState } from "react";
import Context from "../context/context";
import { Box, TextField, Button } from "@mui/material";
import style from "../styles/signup.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  let context = useContext(Context);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    let data = localStorage.getItem('users');
    

    if (data) {
      data = JSON.parse(data);
      data = data.find((item) => item.email === email);
      if (data){
      if (data.password === password) {
        localStorage.setItem("login", JSON.stringify(data));
        context.setLogin(!context.login);
        navigate("/todo");
        toast.success("Aunthenticated");
      } else {
        toast.error("wrong password");
        setPassword("");
      }
    }else{
      toast.error("Account doesn't exist");
      navigate('/signup');
    }
    } else{

      toast.error("Account doesn't exist");
      navigate('/signup');
      
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

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </>
  );
}

export default Login;
