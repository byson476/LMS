import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { useUser } from "../hooks/useUser"; // 이렇게 import 해도 됨

const UserProvider = ({ children }) => {
  // 예제용 상태
  const [user, setUser] = useState({
    isLogin: false,
    name: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
