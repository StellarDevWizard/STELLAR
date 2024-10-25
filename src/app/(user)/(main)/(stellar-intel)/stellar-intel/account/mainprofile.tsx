"use client";

import Form from "./form";
import Image from "next/image";

export default function Mainprofile() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium">Your Profile</h1>
        <p className="text-lg text-slate-400">
          Choose how you are displayed to your friends.
        </p>
      </div>
      <div className="w-full rounded-lg">
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <Form />
          </div>
          <div className="col-span-2">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <Image
                  className="dark:invert"
                  src="https://res.cloudinary.com/dzdgpwtox/image/upload/w_450,c_scale,f_auto/v1626460786/designer-tool-uploads/bucket_6299/1626460725239.png"
                  alt="Profile"
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
