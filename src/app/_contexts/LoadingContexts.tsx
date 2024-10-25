'use client'

import React, { createContext, useState } from "react";

interface LoadingContextType {
  Loading: boolean;
  SetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType>({
  Loading: false,
  SetLoading: () => {},
});

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Loading, SetLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider
      value={{
        Loading,
        SetLoading,
      }}
    >
      <div className={`${Loading && "pointer-events-none"}`}>{children}</div>
      {Loading && (
        <div className="gls-bg fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </LoadingContext.Provider>
  );
}