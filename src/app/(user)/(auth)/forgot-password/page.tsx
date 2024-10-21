"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 space-y-4">
        {/* <h1 className="text-lg font-medium text-white text-center">STELLAR</h1> */}
        <p className="text-gray-400 text-center font-semibold">Rest Password</p>

        <form className="space-y-3">
          <div>
            <label id="email" className="block text-gray-400">
              E-mail
              <input
                autoComplete="email"
                type="email"
                placeholder="example@outlook.in"
                className="input input-bordered w-full bg-gray-700 text-white"
              />
            </label>
          </div>
          <button className="btn btn-primary w-full">Submit</button>
        </form>
        <div className="flex items-center justify-center text-gray-400">
          <h1>Go back to</h1>
          <Link
            href="/signin"
            // onClick={() => router.push(`/signin`)}
            className="font-medium text-sm mx-2 no-underline text-white hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
