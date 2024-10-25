"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LiaEye } from "react-icons/lia";
import { PiEyeClosed } from "react-icons/pi";

const schema = z.object({
  old_password: z
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
  new_password: z
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
  confirm_new_password: z
    .string()
    .nonempty({ message: "Please confirm your new password" }),
});

type FormFields = z.infer<typeof schema>;

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const [Old_Password_Visibility, Set_Old_Password_Visibility] =
    useState<boolean>(false);

  console.log(Old_Password_Visibility, "Old Password");
  const [Confirm_Password_Visibility, Set_Confirm_Password_Visibility] =
    useState<boolean>(false);
  const [Confirm_New_Password_Visibility, Set_Confirm_New_Password_Visibility] =
    useState<boolean>(false);

  return (
    <div className="mt-2">
      <h1 className="text-lg font-semibold">Password&nbsp;&&nbsp;Security</h1>
      <form
        action=""
        onSubmit={handleSubmit(async (data: any) => {
          try {
            if (!(data.new_password === data.confirm_new_password)) {
              setError("new_password", {
                type: "custom",
                message: "Passwords are different",
              });
              setError("confirm_new_password", {
                type: "custom",
                message: "Passwords are different",
              });
              return;
            }
            const response = await AxiosInstance.patch("/api/update-password", {
              old_password: data.old_password,
              password: data.confirm_new_password,
            });
            toast.loading(
              response.data.message + ", Logging out in 3 seconds..."
            );
            setTimeout(() => {
              localStorage.removeItem(USER_TOKEN);
              toast.dismiss();
              router.push("/signin");
            }, 3000);
          } catch (error: any) {
            if (error.response.data.type === "key_error") {
              setError("old_password", {
                type: "custom",
                message: error?.response.data.message,
              });
              return;
            }
            toast.error(error.response?.message);
          }
        })}
      >
        <div className="lg:grid flex flex-col lg:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label htmlFor="old-password">Old Password</label>
            <label className="input input-bordered flex items-center gap-2 w-full rounded-none">
              <input
                {...register("old_password")}
                id="password"
                autoComplete="new-password"
                type={Old_Password_Visibility ? "text" : "password"}
                className="grow"
                placeholder="Enter Password"
              />
              <p
                className="cursor-pointer"
                onClick={() =>
                  Set_Old_Password_Visibility(!Old_Password_Visibility)
                }
              >
                {!Old_Password_Visibility ? (
                  <PiEyeClosed size={23} />
                ) : (
                  <LiaEye size={23} />
                )}
              </p>
            </label>
            <p className="text-red-500 text-md">
              {errors.old_password?.message}
            </p>
          </div>

          <div className="form-control w-full">
            <label htmlFor="old-password">New Password</label>
            <label className="input input-bordered flex items-center gap-2 w-full rounded-none">
              <input
                {...register("old_password")}
                id="password"
                autoComplete="new-password"
                type={Old_Password_Visibility ? "text" : "password"}
                className="grow"
                placeholder="Enter Password"
              />
              <p
                className="cursor-pointer"
                onClick={() =>
                  Set_Old_Password_Visibility(!Old_Password_Visibility)
                }
              >
                {!Old_Password_Visibility ? (
                  <PiEyeClosed size={23} />
                ) : (
                  <LiaEye size={23} />
                )}
              </p>
            </label>
            <p className="text-red-500 text-md">
              {errors.old_password?.message}
            </p>
          </div>

          <div className="flex col-span-2 justify-end items-end gap-4">
            <button
              className="btn btn-sm btn-primary pt-2 pb-4 px-4  "
              type="submit"
              disabled={
                watch("old_password") &&
                watch("new_password") &&
                watch("confirm_new_password")
                  ? false
                  : true
              }
            >
              <div className="join join-item gap-2">
                {/* <FiUserCheck /> */}
                <h1>Change&nbsp;password</h1>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
