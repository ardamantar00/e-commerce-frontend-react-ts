import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductType } from '../types/Types'

export interface BasketSliceType{
        basket : ProductType[],
        totalAmount : number,
    }
    const basketFromStorage = localStorage.getItem("basket")
    const initialState:BasketSliceType = {
        basket :basketFromStorage ? JSON.parse(basketFromStorage):[],
        totalAmount : 0
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
            },
            calculateBasket : (state:BasketSliceType)=>{
                let totalAmount = 0
                state.basket.forEach((product:ProductType)=>{
                    if(product.count) {
                        totalAmount += product.price * product.count
                    } 
                })
                state.totalAmount = totalAmount
            },
            removeProductFromBasket : (state: BasketSliceType,action: PayloadAction<number>)=> {
                state.basket = [...state.basket.filter((product:ProductType)=>product.id !== action.payload)]
                localStorage.setItem("basket",JSON.stringify(state.basket))
            },
            clearBasket: (state: BasketSliceType) => {
                state.basket = [];
                state.totalAmount = 0;
                localStorage.removeItem("basket");
            }
            
        }
    })
export const { addProductToBasket,calculateBasket, removeProductFromBasket,clearBasket} = basketSlice.actions;
export default basketSlice.reducer
