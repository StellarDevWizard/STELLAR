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
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Name must contain atleast 4 characters" })
    .max(50),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
    .transform((val) => Number(val)),
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

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const [value, SetValue] = useState<boolean>(false);
  const toggleValue = () => {
    SetValue(!value);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 space-y-4">
        <h1 className="text-lg font-medium text-white text-center">STELLAR</h1>
        <p className="text-gray-400 text-center">Create your account</p>

        <form
          noValidate
          className="space-y-3"
          onSubmit={handleSubmit(async (data: any) => {
            try {
              const response = await AxiosInstance.post("/api/auth/signup", {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
              });
              console.log(response?.data);
              toast.success(response?.data?.message);
              localStorage.setItem(USER_TOKEN, response?.data?.token);
              router.push(`/signin`);
            } catch (error: any) {
              console.log(error?.response?.data?.message);
              toast.error(error?.response?.data?.message);
            }
          })}
        >
          <div>
            <label id="name" className="block text-gray-400">
              Name
              <input
              autoComplete="name"
                {...register("name")}
                type="text"
                placeholder="Stellarian"
                className="input input-bordered w-full bg-gray-700 text-white"
              />
            </label>
            <p className="text-red-500 text-md">{errors.name?.message}</p>
          </div>
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
                autoComplete="new-password"
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

          <div>
            <label id="phone" className="block text-gray-400">
              Phone
              <input
              autoComplete="tel"
                {...register("phone")}
                type="number"
                placeholder="10-digits"
                className="input input-bordered w-full bg-gray-700 text-white"
              />
            </label>
            <p className="text-red-500 text-md">{errors.phone?.message}</p>
          </div>

          <button className="btn btn-primary w-full">Sign Up</button>
        </form>
        <div className="flex items-center justify-center text-gray-400">
          <h1>Already have account?</h1>
          <button
            onClick={() => router.push(`/signin`)}
            className="btn btn-sm btn-link no-underline text-white hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
