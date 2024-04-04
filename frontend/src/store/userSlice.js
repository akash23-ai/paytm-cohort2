import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token : null,
    user : null,
    balance : ""
}


 const userSlice = createSlice({
    name : "userSlice",
    initialState,
    reducers : {
        setLogin : (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.balance = action.payload.balance;

            console.log(state.user)
            console.log(state.token)
            console.log(state.balance)
        },
        setLogOut : (state, action) => {
            state.user = null,
            state.token = null,
            state.balance = ""
        }
    }
})


export const {setLogOut, setLogin} = userSlice.actions;

export default userSlice.reducer;