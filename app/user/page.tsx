'use client'

import { authClient } from "@/lib/auth-client";
import { user } from "@/types/redux.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function User() {
    const router = useRouter();
    const legacy = useSession();
    const userData = useSelector((state: user) => state.user.userData)
    const session = authClient.useSession();
    const userId = (session.data?.user.id && (userData?._id || session.data.user.id)) || legacy.data?.user.id;
    const isPending = session.isPending || legacy.status === "loading";
    useEffect(() => {
        if (userId) {
            router.replace(`/user/${userId}`)
        } else if (!isPending) {
            router.replace('/login')
        }
    }, [isPending, userId, router]);

    return <div className="page"><p className="page-feedback" role="status">Opening your dashboard...</p></div>;
}
