'use client';

import { Menu, X } from "lucide-react";
import { Archivo_Black, Sora } from "next/font/google";
import Link from "next/link";
import { ChatWidget } from "@agbase/sdk";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const appNameFont = Archivo_Black({
    subsets: ['latin'],
    weight: ['400']
});

const tabFont = Sora({
    subsets: ['latin'],
    weight: ['500']
})

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { data: session, isPending } = authClient.useSession();

    const legacy = useSession();
    const signedIn = Boolean(session?.user.id || legacy.data?.user.id);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(open => !open);
    const pathname = usePathname();
    const onDashboard = /^\/user\/[^/]+\/?$/.test(pathname);

    return (
        <div className="relative">
            <a href="#page-content" className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:bg-base-100 focus:p-3">Skip to content</a>
            <nav className="nav-wrap" aria-label="Main navigation" onKeyDown={(event) => {
                if (event.key === "Escape") setIsMenuOpen(false);
            }}>
                <div className="nav-inner">
                    <div className="flex items-center ">
                        <Link href={'/'} className={`${appNameFont.className} text-2xl`}>AGBase</Link>
                    </div>
                    <ul className="nav-links">
                        <li><Link href="/#features" className={tabFont.className}>Features</Link></li>
                        <li><Link href="/docs" className={tabFont.className}>Docs</Link></li>
                        <li>
                            <Link
                                href="https://github.com/agbasehq/agbase-sdk"
                                target="_blank"
                                rel="noopener noreferrer"
                            >GitHub
                            </Link>
                        </li>
                    </ul>
                    <div className="nav-actions">
                        {signedIn ? (
                            <Link href={onDashboard ? "#dashboard" : "/user"}
                                aria-current={onDashboard ? "page" : undefined}
                                className={`btn-nav-ghost ${tabFont.className}`}
                                onClick={() => setIsMenuOpen(false)}>
                                Dashboard
                            </Link>
                        ) : isPending || legacy.status === "loading" ? (
                            <span className="skeleton h-8 w-20" aria-label="Loading session" />
                        ) : (
                            <Link href="/login" className={`btn-nav-ghost ${tabFont.className}`}>Login</Link>
                        )}
                        <Link href="/docs" className={`btn-nav-primary ${tabFont.className} nav-desktop-action`}>Get Started</Link>
                        <button type="button" className="icon-action nav-menu-toggle" aria-label="Menu" aria-expanded={isMenuOpen} aria-controls={isMenuOpen ? "navigation-menu" : undefined} onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <X className="menu-bar-toggle" />
                            ) : (
                                <Menu className="menu-bar-toggle" />
                            )}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id="navigation-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="nav-mobile-panel bg-(--bg) border-b border-(--border) overflow-hidden"
                        >
                            <ul className="flex flex-col p-5 gap-4">
                                <li>
                                    <Link href="/#features" className={`${tabFont.className} text-(--muted2) hover:text-(--text) block py-2 transition-colors`} onClick={() => setIsMenuOpen(false)}>Features</Link>
                                </li>
                                <li>
                                    <Link href="/docs" className={`${tabFont.className} text-(--muted2) hover:text-(--text) block py-2 transition-colors`} onClick={() => setIsMenuOpen(false)}>Docs</Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/agbasehq/agbase-sdk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${tabFont.className} text-(--muted2) hover:text-(--text) block py-2 transition-colors`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >GitHub
                                    </Link>
                                </li>
                                <li className="pt-2">
                                    <Link
                                        href="/docs"
                                        className={`btn-nav-primary ${tabFont.className} block text-center w-full py-2.5`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <div className="min-w-0 px-3 py-4 sm:px-6" id="page-content" tabIndex={-1}>
                {children}
            </div>
            <ChatWidget appKey={process.env.NEXT_PUBLIC_AGBASE_APP_KEY!}
                name="AGBase" />
        </div>
    );
}
