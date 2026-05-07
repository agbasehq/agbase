import Link from "next/link"
import "@/app/docs/docs.css"

const SideBar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-label">Getting Started</div>
                <ul className="sidebar-nav">
                    <li><Link href="#introduction" className="active">Introduction</Link></li>
                    <li><Link href="#quickstart">Quick Start</Link></li>
                    <li><Link href="#dashboard-setup">Dashboard Setup</Link></li>
                    <li><Link href="#features-json">Defining Features</Link></li>
                </ul>
            </div>
            <div className="sidebar-section">
                <div className="sidebar-label">Integration</div>
                <ul className="sidebar-nav">
                    <li><Link href="#chat-widget">ChatWidget (React)</Link></li>
                    <li><Link href="#html-script">HTML Script Tag</Link></li>
                    <li><Link href="#headless">DoclessClient (Headless)</Link></li>
                    <li><Link href="#nextjs">Next.js Setup</Link></li>
                </ul>
            </div>
            <div className="sidebar-section">
                <div className="sidebar-label">Reference</div>
                <ul className="sidebar-nav">
                    <li><Link href="#response-format">Response Format</Link></li>
                    <li><Link href="#typescript">TypeScript Types</Link></li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar
