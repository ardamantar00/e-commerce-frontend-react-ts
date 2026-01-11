import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductType } from '../types/Types'

export interface BasketSliceType{
        basket : ProductType[]
    }


    
    const initialState:BasketSliceType = {
        basket : []
    }
    const basketSlice = createSlice({
        name : "basket",
        initialState,
        reducers : {
            addProductToBasket : (state : BasketSliceType,action:PayloadAction<ProductType>)=>{
                if (state.basket.length == 0) {
                    state.basket = [action.payload]
                } else {
                    const findProduct = state.basket.find((product: ProductType)=>product.id ==action.payload.id)
                    if (findProduct) {
                        if (findProduct.count && action.payload.count) {
                            findProduct.count = findProduct.count + action.payload.count
                            state.basket = [...state.basket.map((product:ProductType)=> product.id === findProduct?.id ? findProduct :
                            product)]
                        }
                    }else{
                        state.basket.push({
                            ...action.payload,
                            count: action.payload.count ?? 1
                        })
                    }
                }
                localStorage.setItem("basket",JSON.stringify(state.basket))
            }
            
        }
    })
export const { addProductToBasket} = basketSlice.actions;
export default basketSlice.reducer
