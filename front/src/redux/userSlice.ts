import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IUser } from "@/helpers/types/types";

const initialState: { user: IUser | null; token: string | null } = {
  user: null,
  token: Cookies.get("token") || null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 3 });
      } 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token'); 
    },
  },
});

export const { setUserData, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
