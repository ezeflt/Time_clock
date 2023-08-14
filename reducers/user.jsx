import { createSlice } from "@reduxjs/toolkit";

// user local storage value
const initialState={
    value: '', 
}

export const user= createSlice({
    name:'user',
    initialState,
    reducers:{

        /**
         * Description :
         * add the user to voice local storage
         * 
         * @param {object} state the value of user local storage
         * @param {string} action the username that the user wants to add
         */
        addUser: (state, action)=>{
            state.value = action.payload // add user to user local storage
        }
    }
})

// export functions of this page
export const {addUser} = user.actions;
export default user.reducer;