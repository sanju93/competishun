import { Outlet ,NavLink,useNavigate} from "react-router-dom";
import { Box,Button,AppBar,Toolbar,Typography ,IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState} from "react";
import Context from "../context/context";
import { toast } from "react-toastify";
function NavBar(){

   let [login,setLogin] = useState(false);
   let [data,setData] = useState([]);
   let navigate = useNavigate();
  
   
   useEffect(() => {
     let value = localStorage.getItem('login');
     if (value){
      setLogin(!login);
      navigate('/todo')
     }
   },[])

   useEffect(() => {
     let users = localStorage.getItem('users');
     if (users){
      setData(JSON.parse(users));
     }
   },[])

   function handleLogout(){
      localStorage.removeItem('login');
      setLogin(!login);
      navigate('/login');
      toast.success("Logout Successfully");
   }

   return <>
   <Context.Provider value= {{login,setLogin,data,setData}}>
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo App
          </Typography>
          

         {login ? 
         
          <Button onClick={handleLogout} color="inherit">Logout</Button>:
          <>
         <NavLink style={{textDecoration : "none", color : "white"}} to = {"/login"}> <Button color="inherit">
            Login</Button></NavLink>
            <NavLink style={{textDecoration : "none", color : "white"}} to = {"/"}>   <Button color="inherit">SignUp</Button> </NavLink>
          </>
         } 
        </Toolbar>
      </AppBar>
    </Box>

   <Outlet/>
   </Context.Provider>
   </>
}

export default NavBar;