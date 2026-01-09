import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, UserType } from '../types/Types'



export interface appSliceType{
    currentUser : UserType | null,
    loading : boolean,
    products : ProductType[],
}
const initialState : appSliceType = {
    currentUser: null,
    loading : false,
    products : []
}
const appSlice = createSlice({
    name : "app",
    initialState,
    reducers : {
        setLoading : (state : appSliceType,action:PayloadAction<boolean>) =>{
            state.loading = action.payload
        },
        setCurrentUser : (state : appSliceType,action:PayloadAction<UserType | null>)=>{
            state.currentUser = action.payload
        },
        setProducts : (state: appSliceType,action:PayloadAction<ProductType[]>)=>{
            state.products = action.payload;
        }
    }
})
export const  {setLoading,setCurrentUser,setProducts} = appSlice.actions
export default appSlice.reducer