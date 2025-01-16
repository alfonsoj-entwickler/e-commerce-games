"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/";
import { IoInformationCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEffect } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      //router.replace("/")
      window.location.replace("/");
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <label htmlFor="email">E-Mail</label>
      <input
        className="w-full px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Password</label>
      <input
        className="w-full px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />
      {state === "CredentialsSignin" && (
        <div className="flex h-8 mb-2 justify-center items-center space-x-1 text-red-600">
          <IoInformationCircleOutline className="h-5 w-5" />
          <p className="text-sm">Credentials are false</p>
        </div>
      )}
      <div className="text-center">
        <LoginButton />
      </div>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Enter
    </button>
  );
}
