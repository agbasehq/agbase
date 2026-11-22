'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/userSlice";

export default function SessionHydrator() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status !== "loading") dispatch(setAuthUser(session?.user ?? null));
    }, [session, status, dispatch]);

    return null;
}
