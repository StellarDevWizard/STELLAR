"use client";

import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LiaEye } from "react-icons/lia";
import { PiEyeClosed } from "react-icons/pi";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(4, { message: "Password must contain at least 4 characters" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at lbeast one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

type FormFields = z.infer<typeof schema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const [value, SetValue] = useState<boolean>(false);
  const toggleValue = () => {
    SetValue(!value);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 space-y-4">
        <h1 className="text-lg font-medium text-white text-center">STELLAR</h1>
        <p className="text-gray-400 text-center">Sign in with Stellar</p>

        <form
          noValidate
          className="space-y-3"
          onSubmit={handleSubmit(async (data: any) => {
            try {
              const response = await AxiosInstance.post(
                "/api/auth/signin",
                data
              );
              // localStorage.setItem(USER_TOKEN,response?.data?.token)
              localStorage.setItem(USER_TOKEN, response?.data?.token);
              console.log(response?.data);
              toast.success(response?.data?.message);
              // router.push(`/home`);
            } catch (error: any) {
              console.log(error);
              toast.error(error?.response?.data?.message);
            }
          })}
        >
          <div>
            <label id="email" className="block text-gray-400">
              E-mail
              <input
              autoComplete="email"
                {...register("email")}
                type="email"
                placeholder="example@outlook.in"
                className="input input-bordered w-full bg-gray-700 text-white"
              />
            </label>
            <p className="text-red-500 text-md">{errors.email?.message}</p>
          </div>

          <div>
            <label id="password" className="block text-gray-400">
              Password
              <div className="flex flex-row items-center justify-between">
                <input
                  {...register("password")}
                  type={value ? "text" : "password"}
                  placeholder="6+ strong character"
                  className="input input-bordered w-full bg-gray-700 text-white"
                />
                <h1
                  onClick={toggleValue}
                  className={`btn btn-circle btn-ghost`}
                >
                  {!value ? <PiEyeClosed size={20} /> : <LiaEye size={20} />}
                </h1>
              </div>
            </label>
            <p className="text-red-500 text-md">{errors.password?.message}</p>
          </div>

          <div className="flex justify-between items-center text-gray-400">
            <a
              href="#"
              onClick={() => router.push(`/forgot-password`)}
              className="text-sm hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center text-gray-400">
          <h1>Don`t have account?</h1>
          <button
            onClick={() => router.push(`/signup`)}
            className="btn btn-sm btn-link no-underline text-white hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
