"use client";

import { LoadingContext } from "@/app/_contexts/LoadingContexts";
import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
  const { SetLoading } = useContext(LoadingContext);
  const [value, SetValue] = useState<boolean>(false);
  const toggleValue = () => {
    SetValue(!value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
    <form
      noValidate
      className="w-full flex items-center justify-center"
      onSubmit={handleSubmit(async (data: any) => {
        try {
          SetLoading(true);
          const response = await AxiosInstance.post("/api/auth/signin", {
            email: data.email,
            password: data.password,
          });
          localStorage.setItem(USER_TOKEN, response?.data?.token);
          console.log(data);
          toast.success(response?.data?.message);
          router.push(`/stellar-intel/account`);
        } catch (error: any) {
          console.log(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        } finally {
          SetLoading(false);
        }
      })}
    >
      <div className="w-full min-w-sm max-w-lg flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-medium">Sign&nbsp;In</h1>
        <div className="w-full form-control">
          <label id="name">
            Email
            <input
              {...register("email")}
              type="text"
              placeholder="Enter email"
              autoComplete="email"
              className="input w-full input-bordered rounded-none"
            />
          </label>
          <p className="text-red-500 text-md">{errors.email?.message}</p>
        </div>

        <div className="form-control w-full">
          <label htmlFor="password">Password</label>
          <label className="input input-bordered flex items-center gap-2 w-full rounded-none">
            <input
              {...register("password")}
              id="password"
              autoComplete="new-password"
              type={value ? "text" : "password"}
              className="grow"
              placeholder="Enter Password"
            />
            <p className="cursor-pointer" onClick={toggleValue}>
              {!value ? <PiEyeClosed size={25} /> : <LiaEye size={25} />}
            </p>
          </label>
          <p className="text-red-500 text-md">{errors.password?.message}</p>
        </div>

        <div className="w-full">
          <a
            href="#"
            onClick={() => router.push(`/forgot-password`)}
            className="text-sm hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="lg:w-full w-5/6 text-lg rounded-full p-2 shadow-lg bg-black text-white "
        >
          Sign In
        </button>
        <div className="w-full flex justify-center items-center gap-2">
          <h1>Don`t have Account ?</h1>
          <p
            className="btn btn-sm btn-link no-underline hover:underlin"
            onClick={() => router.push(`/signup`)}
          >
            Sign&nbsp;Up
          </p>
        </div>
      </div>
    </form>
  </div>
  );
}
