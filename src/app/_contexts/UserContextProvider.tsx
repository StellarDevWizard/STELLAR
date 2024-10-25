"use client";

import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({
  Data: [],
  SetData: () => [],
  VerifyToken: () => [],
});

export const UserContextProvider = ({ children }: { children: any }) => {
  const router = useRouter();
  const [Data, SetData] = useState<any>([]);
  // const VerifyUserContext = await AxiosInstance.get(`/user/verify`)

  const GetData = async () => {
    try {
      const response = await AxiosInstance.post(`/api/verify`, {
        token: localStorage.getItem(USER_TOKEN),
      });
      SetData(response?.data?.data);
      // console.log(response?.data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem(USER_TOKEN);
      router.push(`/signin`);
    }
  };

  useEffect(() => {
    GetData();
  },[]);

  const value = {
    Data,
    SetData,
    GetData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};