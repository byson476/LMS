import { createContext, useContext } from "react";

// 기본값을 빈 객체로 줌 → Provider 없어도 에러 안 남
export const UserContext = createContext({});

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  // Provider가 없으면 ctx는 {} → 그대로 반환
  return ctx;
};
