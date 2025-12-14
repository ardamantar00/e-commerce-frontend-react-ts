import "../css/LoginPage.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { FaLock } from "react-icons/fa";
import { useFormik } from 'formik';
import {registerPageSchema} from '../schemas/RegisterPageSchema'
import loginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import type { UserType } from "../types/Types";
import { useNavigate } from "react-router-dom";

interface CheckUserType {
  result : boolean,
  currentUser : UserType | null
}
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = (userList : UserType[],username:string,password:string)=>{
    const response : CheckUserType = {result: false,currentUser: null}
    userList.forEach((user:UserType)=>{
      if(user.username === username && user.password === password){
        response.result = true,
        response.currentUser = user; 
      }
    })
    return response;
  }

  const submit = async(values :any,actions:any)=>{
   try{
    dispatch(setLoading(true))
    const response :UserType[] = await loginPageService.login()
    console.log(response);
    if (response) {
        const checkUserResponse : CheckUserType = checkUser(response,values.userName,values.password);
        if (checkUserResponse.result && checkUserResponse.currentUser) {
            dispatch(setCurrentUser(checkUserResponse.currentUser));
            localStorage.setItem("currentUser",JSON.stringify(checkUserResponse.currentUser));
            navigate("/")
        }else{
            toast.error("Kullanıcı adı veya şifre hatalı")
        }
    }
   }catch(error){
    toast.error("Giriş yapılırken hata oluştu" + error )
   }finally{
    dispatch(setLoading(false))
   }
  }
  const clear  = ()=>{
    resetForm();
   }

   const {values,handleSubmit,handleChange,errors,resetForm} = useFormik({
  
       initialValues: {
         userName: '',
         password: '',
       },
  
       onSubmit: submit,
       validationSchema : registerPageSchema
     });
  return (
     <div className='login'>
      <div className='main'>
        <form onSubmit={handleSubmit}>
          <div className='form-div'> 
              <TextField
              sx={{width : "300px",marginBottom:"25px"}}
              id = "userName"
              name='userName'
              label="Kullanıcı Adı"
              value={values.userName}
              onChange={handleChange}
              helperText = {errors.userName && <span style={{color: "red"}}>{errors.userName}</span>}
              slotProps={{
                input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoPersonCircleOutline />
                  </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />
      <TextField sx={{width : "300px"}}
              id="password"
              label="Şifre"
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              helperText = {errors.password && <span style={{color:"red"}}>{errors.password}</span>}
              slotProps={{
                input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock/>
                  </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />
      <div className='button-div'>
            <Button type='submit' sx={{textTransform:"none",height:"25px",marginRight: "10px"}} size='small' variant='contained' color='info'>Giriş Yap</Button>
            <Button onClick={clear} sx={{textTransform:"none",height:"25px",backgroundColor: "#ffbe31ff"}} size='small' variant='contained'>Temizle</Button>
          </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default LoginPage
