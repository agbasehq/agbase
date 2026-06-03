'use client'

import { authClient } from "@/lib/auth-client";
import { user } from "@/types/redux.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function User() {
    const router = useRouter();
    const authUser = useSelector((state: user) => state.user.authUser)
    const userData = useSelector((state: user) => state.user.userData)
    const session = authClient.useSession();
    const userId = userData?._id || authUser?.id || session.data?.user.id;
    useEffect(() => {
        if (userId) {
            router.replace(`/user/${userId}`)
        } else {
            router.replace('/login')
        }
    }, [userId, router])
}
