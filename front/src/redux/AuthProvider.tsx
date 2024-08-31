"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUserData, logout } from "./userSlice";
import { fetchDataUser } from "@/helpers/fetchDataUser";
import { parse } from "jsonc-parser";
import { useSession } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;
  const { data: session } = useSession();

  useEffect(() => {
   
      const tokenString = Cookies.get("token");
      const token = tokenString && parse(tokenString)?.toString();
      if (token) {
        fetchDataUser(token, secret, url)
          .then((res) => {
            dispatch(setUserData(res));
          })
          .catch((error) => {
            console.log(error);
            dispatch(logout());
          });
      } else {
        dispatch(logout());
      }
    
  }, [dispatch, secret, url]);

  return <>{children}</>;
};
