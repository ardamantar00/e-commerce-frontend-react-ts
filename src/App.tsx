import './App.css'
import Spinner from './components/Spinner'
import RouterConfig from './config/RouterConfig'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import HomePage from './pages/HomePage'
import type { ProductType, UserType } from './types/Types'
import productService from './services/ProductService'
import { setBasket, setCurrentUser, setProducts } from './redux/appSlice'
import { useEffect } from 'react'
function App() {
const {currentUser} = useSelector((state : RootState)=>state.app)
const dispatch = useDispatch()
const getAllProducts = async ()=> {
  const products : ProductType[] = await productService.getAllProducts();
  dispatch(setProducts(products));
}
useEffect(()=>{
  getAllProducts();
},[])
useEffect(()=>{
  const currentUserString: string | null = localStorage.getItem("currentUser");
  if(currentUserString){
    const currentUser : UserType = JSON.parse(currentUserString) as UserType
    dispatch(setCurrentUser(currentUser))
  }
},[])
useEffect(()=>{
  const basketString = localStorage.getItem("basket");
  if(basketString){
    const basket:ProductType[] = JSON.parse(basketString) as ProductType[]
    dispatch(setBasket(basket)) 
  }
},[])
  return (
    <div>
      {currentUser &&  <Navbar/>}
      <RouterConfig/>
      <ToastContainer autoClose = {2500} style={{fontSize: "14px"}}/>
      <Spinner/>
    </div>
  )
}

export default App
