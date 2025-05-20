"use client";
import React from "react";

type User = {
  id: number;
  email: string;
  username: string;
  nome: string;
};
type IUserContext = {
  user: User | null;
  setUserState: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null)
    throw new Error("useContext deve estar dentro do Provider.");
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUserState] = React.useState<User | null>(user);
  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}
