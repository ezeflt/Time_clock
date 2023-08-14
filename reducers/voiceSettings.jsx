import { createSlice } from "@reduxjs/toolkit";

// voice local storage value
const initialState={
    value: '',
}

export const voiceSettings= createSlice({

    name:'voiceSettings',
    initialState,
    reducers:{
        /**
         * 
         * @param {object} state the value of voice local storage
         * @param {string} action the voice that user wants to add
         */
        addVoice: (state, action)=>{
            state.value = action.payload; // add voice to voice local storage
        },
    }
})

// export functions of this page
export const {addVoice} = voiceSettings.actions;
export default voiceSettings.reducer;