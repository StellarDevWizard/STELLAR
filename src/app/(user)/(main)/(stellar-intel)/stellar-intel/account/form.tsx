"use client";

import { LoadingContext } from "@/app/_contexts/LoadingContexts";
import { UserContext } from "@/app/_contexts/UserContextProvider";
import { AxiosInstance } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Organization name must contain atleast 4 characters" })
    .max(50),
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(4, { message: "Organization name must contain atleast 4 characters" })
    .max(50),
  email: z.string().email().min(5),
  phone: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
});

type FormFields = z.infer<typeof schema>;

export default function Form() {
  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const { SetLoading } = useContext(LoadingContext);
  const { Data, GetData } = useContext(UserContext);

  useEffect(() => {
    setValue("name", Data?.name);
    setValue("username", Data?.username);
    setValue("email", Data?.email);
    setValue("phone", Data?.phone);
  }, [Data,setValue]);
  // console.log(Data);
  return (
    <form
      noValidate
      className="w-full"
      onSubmit={handleSubmit(async (data: any) => {
        try {
          SetLoading(true);
          const response = await AxiosInstance.patch(`/api/account/` + "id", {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
          });
          toast.success(response?.data?.message);
          await GetData();
          // router.push(`/profile`);
        } catch (error: any) {
          console.log(error?.response?.data?.message);
          if (error.response.data.type === "key_error") {
            setError("email", {
              type: "custom",
              message: error?.response.data.message,
            });
            return;
          }
        } finally {
          SetLoading(false);
        }
      })}
    >
      <div className="flex flex-col gap-4">
        <div className="w-1/2">
          <label id="name" className="text-md">
            Display Name
            {/* <div className="input input-bordered flex items-center">
              <h1>{Data?.name}</h1>
            </div> */}
            <input
              autoComplete="name"
              onChange={(e) => {
                setValue("name", e.target.value);
              }}
              type="name"
              value={watch("name") || ""}
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </label>
          <p className="text-red-500 text-md">{errors.name?.message}</p>
        </div>
        <div className="w-1/2">
          <label id="username" className="text-md ">
            User Name
            <input
              autoComplete="username"
              onChange={(e) => {
                setValue("username", e.target.value);
              }}
              type="username"
              value={watch("username") || ""}
              placeholder="Stellarian 003"
              className="input input-bordered input-sm p-5 w-full bg-gray-700 text-white"
            />
          </label>
          <p className="text-red-500 text-md">{errors.username?.message}</p>
        </div>
        <div className="w-1/2">
          <label id="email" className="text-md ">
            E-Mail
            <input
              autoComplete="email"
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
              type="email"
              value={watch("email") || ""}
              placeholder="example@outlook.com"
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </label>
          <p className="text-red-500 text-md">{errors.email?.message}</p>
        </div>
        <div className="w-1/2">
          <label id="phone" className="text-md ">
            Phone
            <input
              autoComplete="tel"
              onChange={(e) => {
                setValue("phone", e.target.value);
              }}
              value={watch("phone") || ""}
              type="text"
              placeholder="10-digits"
              className="input input-bordered w-full bg-gray-700 "
            />
          </label>
          <p className="text-red-500 text-md">{errors.phone?.message}</p>
        </div>
      </div>
      <button type="submit" className="btn btn-sm mt-6">
        Save Changes <BiSolidSave />
      </button>
    </form>
  );
}
