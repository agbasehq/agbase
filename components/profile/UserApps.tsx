"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit, Plus, Trash } from "lucide-react";
import { AppType } from "@/types/global.types";
import { getUser } from "@/helpers/client/user";
import { user } from "@/types/redux.types";

export default function UserApps() {
    const dispatch = useDispatch();
    const profileId = useSelector((state: user) => state.user.userData?._id);
    const { data: session } = useSession();
    const userId = profileId || session?.user?.id;
    const [apps, setApps] = useState<AppType<string>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState<AppType<string> | null>(null);
    const [deleting, setDeleting] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);

    const fetchApps = useCallback(async (signal?: AbortSignal) => {
        if (!userId) return;
        setLoading(true);
        setError("");
        try {
            if (profileId) {
                const { data } = await axios.get<AppType<string>[]>(`/api/dashboard/app/${profileId}`, { signal });
                setApps(data);
            } else {
                const { data } = await axios.get<{apps: AppType<string>[]}>("/api/v1/app", { signal, params: { userId } });
                setApps(data.apps);
            }
        } catch (cause) {
            if (!axios.isCancel(cause)) setError("We couldn't load your apps. Try again.");
        } finally {
            if (!signal?.aborted) setLoading(false);
        }
    }, [profileId, userId]);

    useEffect(() => {
        const controller = new AbortController();
        void fetchApps(controller.signal);
        return () => controller.abort();
    }, [fetchApps]);

    async function deleteSelected() {
        if (!selected || deleting) return;
        setDeleting(true);
        try {
            const {data} = await axios.delete("/api/v1/app", { params: { appId: selected._id } });
            setApps(current => current.filter(app => app._id !== selected._id));
            toast.success(data.message);
            dialog.current?.close();
        } catch (cause) {
            toast.error(axios.isAxiosError<{message?: string}>(cause)
                ? cause.response?.data.message || "Failed to delete app"
                : "Failed to delete app");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <section className="panel mt-5" id="dashboard" aria-labelledby="apps-heading">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold" id="apps-heading">My apps</h2>
                <Link className="btn btn-primary gap-2" href="/create-app">
                    <Plus size={16} aria-hidden="true" /> Create app
                </Link>
            </header>

            {!userId ? (
                    <div className="page-feedback">
                        <p>Your apps will appear when your profile loads.</p>
                        <button type="button" className="btn btn-outline mt-3" onClick={() => void getUser(dispatch)}>Retry profile</button>
                    </div>
                ) : loading ? <p className="page-feedback" role="status">Loading your apps...</p> :
                error ? (
                    <div className="page-feedback">
                        <p role="alert">{error}</p>
                        <button type="button" className="btn btn-outline mt-3" onClick={() => void fetchApps()}>Retry</button>
                    </div>
                ) : apps.length === 0 ? (
                    <div className="page-feedback">
                        <h3 className="font-semibold text-base-content">No apps yet</h3>
                        <p className="mt-1 text-sm">Create an app to configure its assistant and features.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table app-table" role="table" aria-label="Your apps">
                            <thead role="rowgroup">
                                <tr role="row">
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Features</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody role="rowgroup">
                                {apps.map(app => {
                                    const href = `/user/${userId}/app/${app._id}`;
                                    return (
                                        <tr key={app._id} role="row">
                                            <td role="cell"><Link href={href} className="font-semibold text-(--accent2) hover:underline">{app.name}</Link></td>
                                            <td role="cell" className="max-w-md">{app.description}</td>
                                            <td role="cell"><span className="app-card-label" aria-hidden="true">Features: </span>{app.features?.length ?? 0}</td>
                                            <td role="cell"><span className="app-card-label" aria-hidden="true">Email: </span>{app.contactEmail}</td>
                                            <td role="cell">
                                                <div className="flex items-center gap-2">
                                                    <Link href={href + "/edit"} className="icon-action" aria-label={`Edit ${app.name}`}>
                                                        <Edit size={16} aria-hidden="true" />
                                                    </Link>
                                                    <button type="button" className="icon-action text-error" aria-label={`Delete ${app.name}`}
                                                        onClick={() => { setSelected(app); dialog.current?.showModal(); }}>
                                                        <Trash size={16} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

            <dialog ref={dialog} className="modal" aria-labelledby="delete-app-title"
                onCancel={event => { if (deleting) event.preventDefault(); }} onClose={() => setSelected(null)}>
                <div className="modal-box">
                    <h3 id="delete-app-title" className="text-lg font-semibold">Delete {selected?.name}?</h3>
                    <p className="my-4 text-(--muted2)">This removes the app and its features. Its widget will stop responding.</p>
                    <div className="flex flex-wrap justify-end gap-2">
                        <button type="button" className="btn btn-outline" autoFocus disabled={deleting}
                            onClick={() => dialog.current?.close()}>Cancel</button>
                        <button type="button" className="btn btn-error" disabled={deleting}
                            onClick={() => void deleteSelected()}>{deleting ? "Deleting..." : "Delete app"}</button>
                    </div>
                </div>
            </dialog>
        </section>
    );
}
