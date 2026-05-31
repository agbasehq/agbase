import { Footertabs } from "@/constants/data"
import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link href={'/'}>AGBase</Link>
                        <p>Context-aware AI assistants for any application. Define features,
                            let the AI handle the rest.</p>
                    </div>
                    {Footertabs.map((tab, idx) => (
                        <div className="footer-col" key={idx}>
                            <h4>{tab.title}</h4>
                            <ul>
                                {tab.tabs.map((subtab, subidx) => (
                                    <li key={subidx}>
                                        <Link href={subtab.href} target="_blank"
                                            rel="noopener noreferrer">{subtab.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="footer-bottom">
                    <span>© 2026 AGBase · Built by <Link href={"https://github.com/Dattatray8"} target="_blank"
                        rel="noopener noreferrer" className="text-(--accent)">Dattatray</Link></span>
                    <div className="footer-links-row">
                        <Link href={"https://github.com/agbasehq/agbase-sdk"}
                            target="_blank"
                            rel="noopener noreferrer">Github</Link>
                        <Link href={"https://www.npmjs.com/package/@agbase/sdk"}
                            target="_blank"
                            rel="noopener noreferrer">npm</Link>
                        <Link href={"/privacy"}>Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
