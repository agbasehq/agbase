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

        const elements = document.querySelectorAll("main [id]")

        elements.forEach((el) => observer.observe(el))

        return () => {
            elements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    return (
        <aside className="sidebar hidden lg:block w-120">
            {sections.map((section) => (
                <div className="sidebar-section" key={section.label}>
                    <div className="sidebar-label">{section.label}</div>

                    <ul className="sidebar-nav">
                        {section.items.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`#${item.id}`}
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
        </aside>
    )
}

export default SideBar