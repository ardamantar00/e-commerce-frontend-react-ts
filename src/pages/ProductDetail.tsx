import React, { useEffect, useState } from 'react'
import "../css/ProductDetail.css"
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { setLoading } from '../redux/appSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Types';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Button from '@mui/material/Button';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function ProductDetail() {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const [product,setProduct] = useState<ProductType | null>()
    const [count,setCount] = useState<number>(0);
    const decrease = () => {
        if (count === 0) return; 
        setCount(prev => prev - 1);
  }
    const getProductById = async (productId:Number)=>{
        try {
        dispatch(setLoading(true))
      const product:ProductType = await productService.getProductById(productId);
      setProduct(product)
    } catch (error) {
        toast.error("Ürün detayı getirilirken hata oluştu" + error)
    }finally{
        dispatch(setLoading(false))
    }
    }
    useEffect(()=>{
        getProductById(Number(productId));
    },[])
    
  return (
    <Container maxWidth="lg">
        {product && <>
        <div style={{display : "flex",flexDirection: "row",alignItems : "flex-start",justifyContent: "flex-start",marginTop: "60px "}}>
        <div>
            <img src={product.image}  width ={250} height = {400}alt="" />
        </div>
        <div style={{marginLeft : "60px",marginTop : "60px"}}>
            <div style={{fontFamily: "arial",fontSize :"20px",fontWeight: "bold"}}>{product.title}</div>
            <div style={{fontFamily: "arial",fontSize :"16px",marginTop : "25px",height :"100px"}}>{product.description}</div>
             <div style={{fontFamily: "arial",fontSize :"35px",marginTop : "25px",fontWeight :"bold"}}>{product.price} ₺</div>
             <div style={{display: "flex",alignItems:"center"}}>
                 <CiCirclePlus onClick={()=>setCount(count+1)} className='button'/>
                <span style={{ fontSize: "30px" }}>{count}</span>
                 <CiCircleMinus onClick={()=>decrease()} className='button' /> 
             </div>
             <div>
                <Button color='info' variant='contained' startIcon={<ShoppingBasketIcon />}  size="small">Sepete Ekle</Button>
             </div>
        </div>
        </div>
        </>}
    </Container>
  )
}

export default ProductDetail
