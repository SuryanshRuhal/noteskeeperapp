import {createSlice} from "@reduxjs/toolkit";

export const shrinksbar= createSlice({
    name:"shrinksbar",
    initialState: true,
    reducers:{
        shrinksidebar:(state)=>{
            return (state=!state);
        }
    }
});
 export const {shrinksidebar} = shrinksbar.actions;
 export default shrinksbar.reducer;