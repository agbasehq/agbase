import { AppDispatch } from "@/redux/store";
import { setAuthLoad, setUserData } from "@/redux/userSlice";
import { IUserLogin, IUserRegister } from "@/types/auth.types";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export const handleSignUp = async ({
  formValue,
  dispatch,
}: {
  formValue: IUserRegister;
  dispatch: AppDispatch;
}) => {
  for (const key in formValue) {
    if (formValue[key as keyof IUserRegister] === "") {
      toast.error(`${key} is empty`);
      return;
    }
  }
  dispatch(setAuthLoad(true));
  try {
    const res = await axios.post("/api/v1/auth/signup", formValue, {
      withCredentials: true,
    });
    toast.success(res?.data?.message);
    dispatch(setUserData(res?.data?.user));
  } catch (error) {
    const message = axios.isAxiosError<{message?: string}>(error) ? error.response?.data.message : undefined;
    toast.error(message || "Could not sign up");
  } finally {
    dispatch(setAuthLoad(false));
  }
};

export const handleLogin = async ({
  formValue,
  dispatch,
}: {
  formValue: IUserLogin;
  dispatch: AppDispatch;
}) => {
  for (const key in formValue) {
    if (formValue[key as keyof IUserLogin] === "") {
      toast.error(`${key} is empty`);
      return;
    }
  }
  dispatch(setAuthLoad(true));
  try {
    const res = await signIn("credentials", {
      email: formValue.email,
      password: formValue.password,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Login Successful!");
    } else {
      toast.error(res?.error || "Invalid Credentials");
    }
  } catch {
    toast.error("Could not sign in");
  } finally {
    dispatch(setAuthLoad(false));
  }
};

export const handleGoogleAuth = async () => {
  const res = await signIn("google", { callbackUrl: "/user" });
  console.log(res)
};

export const handlGithubAuth = async () => {
  await signIn("github", { callbackUrl: "/user" });
};
