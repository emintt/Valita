import { TokenContent } from "@/types/DBTypes";
import React, { createContext, useState } from "react";

const UserContext =  createContext<TokenContent | null>(
  {
    user_id: 0,
    level_name: '',
  }
);

export function AppWrapper({children}: {
  children: React.ReactNode
}) {
  let [userState, setUserState] = useState<TokenContent | null>(null);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );



}