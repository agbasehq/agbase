"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <main className="page">
            <section className="panel mx-auto max-w-lg space-y-4">
                <h1 className="page-title">Page not found</h1>
                <p className="page-sub">Check the address or return to AGBase.</p>
                <div className="flex flex-wrap gap-3">
                    <Link href="/" className="btn btn-primary">Go home</Link>
                    <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>
                        Go back
                    </button>
                </div>
            </section>
        </main>
    );
}
