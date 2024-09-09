"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUserData, setToken } from "./userSlice";
import { fetchDataUser } from "@/helpers/fetchDataUser";
import { useSession } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;
  const { data, status } = useSession();

  useEffect(() => {
    const tokenString = Cookies.get("token");
    if (tokenString) {
      fetchDataUser(tokenString, secret, url)
        .then((userData) => {
          dispatch(setUserData(userData));
          dispatch(setToken(tokenString));
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    } else if (data && !tokenString) {
      const fetchData = async () => {
        try {
          const res = await fetch(`${url}/auth/authGoogle`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.user?.name,
              email: data.user?.email,
            }),
          });

          const datares = await res.json();

          Cookies.set("token", datares.token, { expires: 3 });

          dispatch(setUserData(datares.user));
          dispatch(setToken(datares.token));
        } catch (error) {
          console.error("Error fetching data from authGoogle", error);
        }
      };

      fetchData();
    }
  }, [dispatch, secret, url, status, data]);

  return <>{children}</>;
};
