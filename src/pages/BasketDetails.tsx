import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setDrawer, updateBalance } from '../redux/appSlice';
import type { ProductType, UserType } from '../types/Types';
import Button from '@mui/material/Button';
import { calculateBasket, removeProductFromBasket,clearBasket  } from '../redux/basketSlice';
import { toast } from 'react-toastify';
function BasketDetails() {
    const {drawer,currentUser} = useSelector((state:RootState)=>state.app)
    const {basket,totalAmount} = useSelector((state:RootState)=>state.basket)
     const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(calculateBasket())
    },[basket])
   
    const closeDrawer = ()=>{
        dispatch(setDrawer(false))
    }
    const removeProduct = (productId : number)=>{
        dispatch(removeProductFromBasket(productId))
    }
    const buy = ()=>{
        if(currentUser && currentUser.balance < totalAmount){
            toast.warn("Bakiyeniz yeterli değildir")
            return;
        }
        if(currentUser?.balance){
            const remaningTotal = currentUser.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance :remaningTotal
            }
            dispatch(updateBalance(payload))
            dispatch(clearBasket()); 
            localStorage.removeItem("basket")
            toast.success("Ürünler satın alındı")
            
        }
        
    }
  return (
        <Drawer open={drawer} onClose={closeDrawer} anchor='right' sx={{width: "400px"}}>
            {
            basket && basket.map((product:ProductType)=>(
                <>
                <div style={{display: "flex",flexDirection:"row",alignItems:"center",justifyContent: "flex-start",padding: "20px 30px"}}>
                    <div style={{marginRight: "15px"}}><img src={product.image} width={60} height={60}/></div>
                    <div style={{width:"300px"}}>
                        <div style={{fontFamily : "arial",fontWeight: "bold"}}>{product.title.substring(0,30)}</div>
                        <div>{product.description.substring(0,40)}</div>
                    </div>
                     <div style={{marginRight: "40px"}}>{product.count}</div>
                    <div style={{fontFamily : "arial",fontSize:"16px",fontWeight:"bold",color:"#577e53",width:"70px"}}>{product.price} ₺</div>
                    <div><Button onClick={()=>removeProduct(product.id)} variant='outlined' color='error' size='small' sx={{margin: "0 10px",textTransform:"none",height:"25px"}}>Çıkar</Button></div>
                </div>
                
               </>
            ))
            }
            <div  style={{display: "flex",flexDirection :  "column",alignItems: "center",justifyContent: "center"}}>
                <div style={{fontFamily: "arial",fontSize: "20px",fontWeight: "bold"}}>Toplam Tutar : {totalAmount.toFixed(2)} ₺</div>
                <div><Button onClick={buy} color='success' variant='contained' size='small' sx={{textTransform: "none",height:"25px",marginTop:"10px"}}>Satın Al</Button></div>
            </div>
        </Drawer>
  )
}

export default BasketDetails
