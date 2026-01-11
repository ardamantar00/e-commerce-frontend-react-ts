import React from 'react'
import {Route,Routes} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from "../pages/RegisterPage"
import ProductDetail from '../pages/ProductDetail'
function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/product-detail/:productId' element={<ProductDetail/>}/>
      </Routes>
    </div>
  )
}

export default RouterConfig
