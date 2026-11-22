"use client";

import AppFeatures from "@/components/AppFeatures";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { AppType, Feature } from "@/types/global.types";
import axios from "axios";

export default function App({ params }: { params: Promise<{ id: string; appId: string }> }) {
    const {id, appId} = use(params);
    const [app, setApp] = useState<AppType | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        axios.get<{app: AppType}>("/api/v1/app", { params: { appId }, signal: controller.signal }).then(({data}) => {
            setApp(data.app);
        }).catch((cause: unknown) => {
            if (!axios.isCancel(cause)) setError("We couldn't load this app.");
        });
        return () => controller.abort();
    }, [appId]);

    const features = app?.features?.map(({name, description, route, image, elementId}: Feature) =>
        ({name, description, route, image, elementId})) ?? [];

    return (
        <main className="page">
            <Link href="/user" className="page-breadcrumb">Dashboard</Link>
            {error ? <p role="alert" className="page-feedback">{error}</p> : !app ? (
                <p role="status" className="page-feedback">Loading app...</p>
            ) : (
                <section className="panel">
                    <header className="flex flex-wrap items-start justify-between gap-3">
                        <h1 className="page-title">{app.name}</h1>
                        <Link className="btn btn-outline" href={`/user/${id}/app/${appId}/edit`}>Edit app</Link>
                    </header>
                    <dl className="my-5 grid gap-4 break-words">
                        <div><dt className="text-sm text-(--muted)">Contact email</dt><dd>{app.contactEmail}</dd></div>
                        <div><dt className="text-sm text-(--muted)">Description</dt><dd className="whitespace-pre-wrap">{app.description}</dd></div>
                    </dl>
                    <h2 className="mb-3 text-lg font-semibold">App features</h2>
                    <AppFeatures featues={JSON.stringify(features, null, 2)} />
                </section>
            )}
        </main>
    );
}
