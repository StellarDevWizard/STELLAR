"use client";

import { LuLock } from "react-icons/lu";
import Mainprofile from "./mainprofile";
import ChangePasswordForm from "./ChangePassword";
import { useState } from "react";

export default function Intel() {
  const [value, setValue] = useState<boolean>(false);
  console.log(value)
 
  return (
    <div className="w-full flex flex-col pt-10">
      <Mainprofile />
      <div className="divider"></div>
      <div className=" w-full flex flex-col gap-2">
        <div>
          <h1 className="text-xl font-medium">Password and Authentication</h1>
          <h1 className="text-lg text-slate-400">
            Secure your account by changing you password.
          </h1>
        </div>
        <div className="w-full p-4 bg-gray-800/30 backdrop:lg rounded-lg">
          <div className="flex items-start justify-between">
            <div className="grid grid-cols-12 items-start gap-4">
              <div className="col-span-1 flex items-center justify-center text-lg">
                <LuLock className="mt-1 text-slate-400" />
              </div>
              <div className="col-span-11">
                <h1>Account Password</h1>
                <p>
                  Please follow the upcoming instructions to change your
                  password.
                </p>
              </div>
            </div>
            <button onClick={()=>setValue(true)} className="btn btn-sm">
              Change Password
            </button>
          </div>
          {value && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}
