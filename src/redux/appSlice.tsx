import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface appSliceType{
    currentUser : UserType | null,
    loading : boolean
}
const initialState : appSliceType = {
    currentUser: null,
    loading : false
}
const appSlice = createSlice({
    name : "app",
    initialState,
    reducers : {
        setLoading : (state : appSliceType,action:PayloadAction<boolean>) =>{
            state.loading = action.payload
        },
        setCurrentUser : (state : appSliceType,action:PayloadAction<boolean>)=>{
            state.currentUser = action.payload
        }
    }
})
export const  {setLoading,setCurrentUser} = appSlice.actions
export default appSlice.reducer