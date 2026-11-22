"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import "@/app/docs/docs.css"
import { sections } from "@/constants/data"

const SideBar = () => {
    const [activeSection, setActiveSection] = useState("introduction")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0,
            }
        )

        const elements = document.querySelectorAll(".docs-main [id]")

        elements.forEach((el) => observer.observe(el))

        return () => {
            observer.disconnect()
        }
    }, [])

    const items = (
        <>
            {sections.map((section) => (
                <div className="sidebar-section" key={section.label}>
                    <div className="sidebar-label">{section.label}</div>

                    <ul className="sidebar-nav">
                        {section.items.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`#${item.id}`}
                                    aria-current={activeSection === item.id ? "location" : undefined}
                                    className={
                                        activeSection === item.id
                                            ? "active"
                                            : ""
                                    }
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );

    return (
        <>
            <details className="panel lg:hidden">
                <summary className="cursor-pointer font-semibold">On this page</summary>
                <nav className="mt-4" aria-label="Documentation sections">{items}</nav>
            </details>
            <aside className="sidebar hidden lg:block">
                <nav aria-label="Documentation sections">{items}</nav>
            </aside>
        </>
    );
}

export default SideBar
