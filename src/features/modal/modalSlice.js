import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isOpen: false
}

let modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state,action) => {
            state.isOpen = true;            
        },
        closeModal: (state, action) => {
            state.isOpen = false;
        }
    }
})

export let { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;