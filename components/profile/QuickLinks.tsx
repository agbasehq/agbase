import { QuickLinksData } from "@/constants/data"
import Link from "next/link"

const QuickLinks = () => {
    return (
        <div className="mt-8 grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {QuickLinksData.map((link, idx) => (
                <Link href={link.href} key={idx} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-start gap-3 rounded-xl border border-[#FFFFFF0F] bg-(--bg2) p-4 px-4.5 no-underline transition-all duration-200 hover:border-(--border2)">
                    <span className="text-xl">{link.icon}</span>
                    <div>
                        <div className="mb-1 text-[14px] font-semibold text-(--text)">{link.title}</div>
                        <div className="text-[12.5px] text-(--muted2)">{link.description}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default QuickLinks
