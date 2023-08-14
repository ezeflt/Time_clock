import { createSlice } from "@reduxjs/toolkit";

// timer local storage value
const initialState={
    value: {},
}

export const timer= createSlice({

    name:'timer',
    initialState,
    reducers:{

        /**
         * Description :
         * push timer into local storage
         * 
         * @param {objet} state the value of timer local storage 
         * @param {objet} action the timer that the user wants to add
         */
        addTimer: (state, action)=>{
            state.value = action.payload;
        },

        /**
         * Description :
         * delete all timers to local storage
         * 
         * @param {objet} state the value of timer local storage
         */
        resetAll: (state)=>{
            state.value = {}; // empty the timer local storage
        },

        /**
         * Description :
         * delete a timer to local storage
         * 
         * @param {objet} state the value of timer local storage
         * @param {objet} action the timer that the user wants to delete
         */
        removeTimer : (state, action)=>{
            // finds the index of the timer sent in the timer
            const index = state.value.findIndex((data) => data.hour === action.payload);
            if (index !== -1) {
              state.value.splice(index, 1); // removes the timer found by its index 
            }        
        },
    }
})

// export functions of this page
export const {addTimer, resetAll, removeTimer} = timer.actions;
export default timer.reducer;