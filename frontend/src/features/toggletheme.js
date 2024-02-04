import {createSlice} from "@reduxjs/toolkit";

export const themeSlice= createSlice({
    name: "themeSlice",
    initialState: true,
    reducers:{
        toggletheme:(state)=>{
            return (state=!state);
        }
    },
});
export const{toggletheme}= themeSlice.actions;
export default themeSlice.reducer;