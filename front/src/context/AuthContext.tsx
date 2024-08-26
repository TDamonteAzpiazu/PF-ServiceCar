"use client";
import React, { useContext, createContext, useEffect, useState } from "react";
import { ContextProps, UserSessionProps } from "@/helpers/types/types";
import Cookies from "js-cookie";
import { parse } from "jsonc-parser";

<<<<<<< HEAD

=======
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
const AuthContext = createContext<ContextProps>({
  dataUser: null,
  setDataUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [dataUser, setDataUser] = useState<UserSessionProps | null>(null);

  useEffect(() => {
    if (dataUser) {
<<<<<<< HEAD
      Cookies.set("userData", JSON.stringify(dataUser), { expires: 3 });
=======
      Cookies.set("token", JSON.stringify(dataUser), { expires: 3 });
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
    }
  }, [dataUser]);

  useEffect(() => {
<<<<<<< HEAD
    const data = parse(Cookies.get("userData")?.toString() || "{}");
=======
    const data = parse(Cookies.get("token")?.toString() || "{}");
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
    setDataUser(data);
  }, []);

  return (
    <AuthContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
