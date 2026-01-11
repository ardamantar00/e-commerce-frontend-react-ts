import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputAdornment from '@mui/material/InputAdornment';
import LogoIcon from "../images/magara.png"
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentUser, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import type { ProductType } from '../types/Types';
import productService from '../services/ProductService';
import Badge from '@mui/material/Badge';
import { FaShoppingBasket } from 'react-icons/fa';
import type { RootState } from '../redux/store';
function Navbar() {
    const dispatch = useDispatch();
    const {basket} = useSelector((state:RootState)=>state.basket)
    const navigate = useNavigate();
    const  logout = ()=>{
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("Çıkış yapılıyor")

    }
    const handleFilter =  async (e:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(e.target.value){
          dispatch(filterProducts(e.target.value))
        }else{
          const products:ProductType[] = await productService.getAllProducts()
          dispatch(setProducts(products))
        }
      } catch(error){
        toast.error("Filtreleme yaparken hata oluştu: " + error)
      }
    }
  return (
    
  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#A3897A"}}>
        <Toolbar>
          <IconButton
          onClick={()=>navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src = {LogoIcon} height={60} width={60}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: "pointer" }}
           onClick={()=>navigate("/")}>
            Mağara A.Ş
          </Typography>
          <div style={{display: "flex",flexDirection : "row",justifyContent : "center",alignItems : "center"}}>
          <TextField
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleFilter(e)}
              sx={{width : "300px",marginBottom:"25px"}}
              id = "searchInput"
                placeholder='bir şey ara ...'
              
              slotProps={{
                input: {
                startAdornment: (
                  <InputAdornment position="start">
                    
                  </InputAdornment>
                  
            ),
             style : {color:"#fff",borderBottom : "1px solid grey"}
            
          },
         
          
        }}
        variant="standard"
      />
        <Badge badgeContent={basket.length} color="warning" sx={{margin: "0px 10px"}}>
           <FaShoppingBasket color="action" style={{fontSize: "18px",cursor: "pointer"}}/>
        </Badge>
          <Button onClick={()=>logout()} color="inherit" sx={{textTransform: "none"}} >Çıkış Yap</Button>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
