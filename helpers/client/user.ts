import { AppDispatch } from "@/redux/store";
import { setAuthUser, setUserData } from "@/redux/userSlice";
import axios from "axios";
import { signOut } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export const getUser = async (dispatch: AppDispatch, signal?: AbortSignal) => {
  try {
    const res = await axios.get("/api/dashboard/user", { signal, withCredentials: true });
    if (!signal?.aborted) dispatch(setUserData(res.data));
    return true;
  } catch (error) {
    if (!axios.isCancel(error) && !(axios.isAxiosError(error) && error.response?.status === 401)) {
      toast.error("Couldn't load your profile");
    }
    return false;
  }
};

export const handleSignOut = async (
  router: AppRouterInstance,
  dispatch: AppDispatch,
) => {
  try {
    await signOut({ redirect: false });
    dispatch(setUserData(null));
    dispatch(setAuthUser(null));
    router.replace("/");
  } catch (error) {
    console.log(error);
  }
};
