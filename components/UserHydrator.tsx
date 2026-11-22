'use client'

import { authClient } from "@/lib/auth-client";
import { setUserData } from "@/redux/userSlice";
import { getUser } from "@/helpers/client/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserHydrator() {
    const dispatch = useDispatch();

    const { data, isPending } = authClient.useSession();
    const userId = data?.user.id;

    useEffect(() => {
        if (isPending) return;
        if (!userId) {
            dispatch(setUserData(null));
            return;
        }

        const controller = new AbortController();
        void getUser(dispatch, controller.signal);
        return () => controller.abort();
    }, [dispatch, isPending, userId]);

    return null; 
}
