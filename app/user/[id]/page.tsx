"use client";

import { setUserData } from "@/redux/userSlice";
import type { user } from "@/types/redux.types";
import axios from "axios";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UserApps from "@/components/profile/UserApps";
import QuickLinks from "@/components/profile/QuickLinks";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
    const { data: session, isPending } = authClient.useSession();
    const { userData, authUser } = useSelector((state: user) => state.user);
    const profileName = userData?.username || session?.user.name || authUser?.name || "Your profile";
    const profileImage = userData?.image || session?.user.image || authUser?.image;
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState("");
    const [saving, setSaving] = useState(false);
    const imageInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!image) return;
        const url = URL.createObjectURL(image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    function stopEditing() {
        setEditing(false);
        setImage(undefined);
        setPreview("");
    }

    async function saveProfile(event: React.FormEvent) {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("name", name.trim());
            if (image) formData.append("file", image);
            const {data} = await axios.patch("/api/dashboard/user", formData);
            dispatch(setUserData(data));
            toast.success("Profile updated");
            stopEditing();
        } catch (cause) {
            const message = axios.isAxiosError<{message?: string | string[]}>(cause)
                ? cause.response?.data.message : undefined;
            toast.error((Array.isArray(message) ? message.join(", ") : message) || "Couldn't update your profile");
        } finally {
            setSaving(false);
        }
    }

    if (isPending) {
        return <main className="page"><p className="page-feedback" role="status">Loading your profile...</p></main>;
    }

    const avatar = (editing && preview) || profileImage;
    return (
        <main className="page">
            <h1 className="page-title mb-4">Dashboard</h1>
            <section className="panel" id="profile" aria-labelledby="profile-heading">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-4">
                    {avatar ? (
                        <Image src={avatar} alt="" width={88} height={88} unoptimized={Boolean(preview)}
                            className="size-14 rounded-full object-cover sm:size-22" />
                    ) : (
                        <span aria-hidden="true" className="grid size-14 place-items-center sm:size-22 rounded-full border border-(--border2) bg-(--bg3) text-3xl font-semibold text-(--accent2)">
                            {profileName[0]?.toUpperCase()}
                        </span>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm text-(--muted)">Profile</p>
                        <h2 className="wrap-anywhere text-lg font-semibold leading-snug sm:text-xl" id="profile-heading">{profileName}</h2>
                    </div>
                    {!editing && (
                        <button type="button" className="btn btn-outline col-span-2 w-full sm:col-span-1 sm:w-auto" onClick={() => {
                            setName(userData?.username || session?.user.name || authUser?.name || "");
                            setEditing(true);
                        }}>Edit profile</button>
                    )}
                </div>
                {editing && (
                    <form className="mt-5 grid gap-4" onSubmit={saveProfile}>
                        <label className="grid max-w-md gap-2 text-sm">
                            Display name
                            <input name="username" value={name} className="input w-full" required
                                autoComplete="name" onChange={event => setName(event.target.value)} />
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input type="file" accept="image/*" hidden ref={imageInput} onChange={event => {
                                const file = event.target.files?.[0];
                                event.target.value = "";
                                if (file && file.size > 10 * 1024 * 1024) {
                                    toast.error("Choose an image up to 10 MB");
                                } else if (file) {
                                    setImage(file);
                                }
                            }} />
                            <button type="button" className="btn btn-outline" disabled={saving} onClick={() => imageInput.current?.click()}>
                                <Camera size={16} aria-hidden="true" /> Change photo
                            </button>
                            {image && <span className="min-w-0 break-all text-sm text-(--muted2)">{image.name}</span>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button type="submit" className="btn btn-primary" disabled={saving || !name.trim()}>
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                            <button type="button" className="btn btn-outline" disabled={saving} onClick={stopEditing}>Cancel</button>
                        </div>
                    </form>
                )}
            </section>
            <UserApps />
            <QuickLinks />
            <div className="mt-6 flex justify-end">
                <button type="button" className="btn btn-ghost text-error" onClick={async () => await authClient.signOut({
                    fetchOptions: { onSuccess: () => router.push("/login") },
                })}>Log out</button>
            </div>
        </main>
    );
}
