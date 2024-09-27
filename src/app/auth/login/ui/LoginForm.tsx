"use client";
import { useFormState } from "react-dom";
import { authenticate } from "@/actions/";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  console.log("LoginForm state --> ", state);

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
      <div className="text-center">
        <button type="submit" className="btn-primary">
          Enter
        </button>
      </div>
    </form>
  );
};
