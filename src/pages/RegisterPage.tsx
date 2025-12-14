import React from 'react'
import "../css/RegisterPage.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { FaLock } from "react-icons/fa";
import { useFormik } from 'formik';
import {registerPageSchema} from '../schemas/RegisterPageSchema'
import type { UserType } from '../types/Types';
import RegisterPageService from '../services/RegisterPageService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

 
function RegisterPage() {
  const navigate = useNavigate();
  const submit = async(values:any,actions:any)=>{
    try{
      const payload : UserType = {
        username : values.userName,
        password : values.password,
        balance : values.balance
      }
     const response =  await RegisterPageService.register(payload)
     if(response){
      clear();
      toast.success("Kullanıcı Kaydedildi");
      navigate("/login")
     }
    }catch(error){
      toast.error("Kullanıcı kayıt edilirken hata oluştu")
    }
   }

  const {values,handleSubmit,handleChange,errors,resetForm} = useFormik({

     initialValues: {
        id: String(Math.floor(Math.random()*9999999)),
       userName: '',
       password: '',
       balance : 1500
     },

     onSubmit: submit,
     validationSchema : registerPageSchema
   });
   
   const clear  = ()=>{
    resetForm();
   }

  return (
    <div className='register'>
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
            <Button type='submit' sx={{textTransform:"none",height:"25px",marginRight: "10px"}} size='small' variant='contained' color='info'>Kaydol</Button>
            <Button onClick={clear} sx={{textTransform:"none",height:"25px",backgroundColor: "#ffbe31ff"}} size='small' variant='contained'>Temizle</Button>
          </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
