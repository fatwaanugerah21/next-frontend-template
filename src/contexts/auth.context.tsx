import { apiGetMe } from "@/apis/me.api";
import { IApiUser } from "@/types/api.type";
import { getBrowserAuthTokenFromCookie } from "@/utils/auth.util";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";

type TAuthContext = {
  isLogin: boolean;
  loggedInUser: IApiUser | undefined;
  setLoggedInUser: (user: IApiUser) => void;
};

const AuthContext = React.createContext<TAuthContext>({
  isLogin: false,
  loggedInUser: undefined,
  setLoggedInUser: () => {
    console.log("Please wrap inside a provider");
  },
});

const AuthContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    async function checkLogin() {
      console.log("getBrowserAuthTokenFromCookie(): ", getBrowserAuthTokenFromCookie());
      if (!getBrowserAuthTokenFromCookie()) return;

      const me = await apiGetMe();
      if (me.success) setLoggedInUser(me.data!.user);
    }

    checkLogin();
  }, [getBrowserAuthTokenFromCookie()]);

  const value: TAuthContext = {
    isLogin: !!loggedInUser,
    loggedInUser,
    setLoggedInUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw "AuthContext not yet wrapped inside a provider.";
  }

  return ctx;
};

export default AuthContextProvider;
