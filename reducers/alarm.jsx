import { createSlice } from "@reduxjs/toolkit"; // to create a slice

// alarm local storage value
const initialState={
    value: [],
}

export const alarme= createSlice({

    name:'alarme',
    initialState,
    reducers:{

        /**
         * Description :
         * push alarm into alarm local storage
         * 
         * @param {object} state is used to GET the value of alarm local storage
         * @param {objet} action is used to GET the alarm that the user wants to add
         */
        addAlarm: (state, action)=>{
            state.value.push(action.payload);   // push the alarm into local storage
        },

        /**
         * Description :
         * delete all alarms to local storage
         * 
         * @param {object} state is used to GET the value of alarm local storage
         */
        resetAll: (state)=>{
            state.value = [];   // empty the alarm local storage
        },

        /**
         * Description :
         * delete a alarm to alarm local storage
         * 
         * @param {object} state is used to GET the value of alarm local storage
         * @param {objet} action is used to GET the alarm that the user wants to delete
         */
        removeAlarm : (state, action)=>{
            // finds the index of the alarm sent in the alarm array
            const index = state.value.findIndex((data) => data.hour === action.payload);
            if (index !== -1) {
              state.value.splice(index, 1);  // removes the alarm found by its index 
            }        
        },
    }
})

// export functions of this page
export const {addAlarm, resetAll, removeAlarm} = alarme.actions;
export default alarme.reducer;