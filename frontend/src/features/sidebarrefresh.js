import {createSlice} from "@reduxjs/toolkit";

export const refreshsidebar= createSlice({
    name: "refreshsidebar",
    initialState: true,
    reducers:{
        refreshsidebarfun:(state)=>{
            return (state==!state);
        }
    },
});

export const {refreshsidebarfun}= refreshsidebar.actions;
export default refreshsidebar.reducer;