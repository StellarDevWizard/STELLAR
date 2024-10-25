"use client";

import { UserContextProvider } from "@/app/_contexts/UserContextProvider";
import { USER_TOKEN } from "@/utils/Instances";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  useEffect(()=>{
    const token = localStorage.getItem(USER_TOKEN)
    if(!token){
      redirect(`/signin`)
    }
  },[])

  return (
    <div className="w-full">
      <UserContextProvider>{children}</UserContextProvider>
    </div>
  );
}