"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./stellar-intel/_components/NavBar";

export default function layout({ children }: { children: any }) {
  return (
    <div className="w-full pb-10">
      <NavBar />
      <div className="w-full mx-auto max-w-3xl">{children}</div>
    </div>
  );
}