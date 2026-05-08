'use client'

// import Link from "next/link";
// import { Check, Copy } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
import SideBar from "@/components/docs/SideBar";
import "./docs.css"
import Link from "next/link";

// export default function GetStartedPage() {
//     const [copied, setCopied] = useState<string>("");
//     const copyToClipboard = async (text: string, arg: string) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopied(arg);
//             setTimeout(() => setCopied(""), 2000);
//         } catch (err) {
//             toast.error("Failed to copy text");
//             console.error("Failed to copy text: ", err);
//         }
//     };



//     const dropInWidgetCode = `// Just import and drop it in ${"\n"}import { ChatWidget } from "@doclessai/sdk";\n\n<ChatWidget appKey="YOUR_KEY" name="YOUR_ASSISTANT_NAME" />`
//     const installCmd = "npm i @doclessai/sdk";
//     const headlessSdkCode = `// Use the client logic directly ${"\n"}import { DoclessClient } from "@doclessai/sdk";\n\nconst ai = new DoclessClient({appKey: "YOUR_KEY"});\n\nconst res = await ai.ask(userQuery);\n\nconst res = await ai.ask(userQuery, ImageFile);`

//     return (
//         <div className="flex flex-col gap-10 md:p-8 max-w-5xl mx-auto mb-20 text-base-content" id="docs">
//             <div className="hero bg-base-200 rounded-3xl p-6 md:p-12 shadow-inner border border-base-300">
//                 <div className="hero-content flex-col lg:flex-row-reverse gap-8">
//                     <div className="text-center lg:text-left">
//                         <h1 className={`${font.className} text-4xl md:text-6xl text-primary leading-tight`}>
//                             Ready to build?
//                         </h1>
//                         <p className="py-6 text-lg md:text-xl opacity-80">
//                             Connect your application to DoclessAI.
//                             Add a context-aware AI assistant using our drop-in widget or headless SDK.
//                         </p>
//                         <Link href="/user"
//                             className="btn btn-primary btn-md md:btn-lg shadow-lg hover:scale-105 transition-transform">
//                             Create Assistant
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none"
//                                 viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                     d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <p className="text-sm opacity-60 mt-2">
//                 Works with React, Next.js, and plain HTML.
//             </p>

//             <section className="flex flex-col gap-4">
//                 <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
//                     <span
//                         className="bg-primary text-primary-content w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-base">1</span>
//                     Install the SDK
//                 </h2>
//                 {/* Added bg-neutral and text-neutral-content to force visibility */}
//                 <div className="mockup-code bg-neutral text-neutral-content shadow-xl">
//                     <span className="absolute top-3 right-3">
//                         {copied === "installCmd" ? <Check className="w-6 h-6 text-success bg-success/10 rounded-full p-1" /> :
//                             <Copy className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
//                                 onClick={() => copyToClipboard(installCmd, "installCmd")} />}
//                     </span>
//                     <pre data-prefix="$" className="text-white"><code>npm i @doclessai/sdk</code></pre>
//                 </div>
//             </section>

//             <section className="flex flex-col gap-6">
//                 <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
//                     <span
//                         className="bg-primary text-primary-content w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-base">2</span>
//                     Integrate your way
//                 </h2>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//                     <div className="card bg-base-100 border-2 border-primary/30 shadow-xl relative overflow-hidden">
//                         <div
//                             className="absolute top-0 right-0 bg-primary text-primary-content px-4 py-1 rounded-bl-xl font-bold text-xs uppercase tracking-widest">
//                             Recommended
//                         </div>
//                         <div className="card-body p-6">
//                             <h3 className="card-title text-2xl mb-2">Drop-in Widget</h3>
//                             <p className="text-sm opacity-70 mb-4">The fastest way to add AI. Handles UI, markdown formatting, image previews, auto-scrolling, and feature navigation.</p>

//                             <div className="mockup-code bg-neutral text-white text-xs md:text-sm">
//                                 <span className="absolute top-3 right-3">
//                                     {copied === "dropInWidgetCode" ? <Check className="w-6 h-6 text-success bg-success/10 rounded-full p-1" /> :
//                                         <Copy className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
//                                             onClick={() => copyToClipboard(dropInWidgetCode, "dropInWidgetCode")} />}
//                                 </span>
//                                 <pre
//                                     className="text-success italic"><code>{"// Just import and drop it in"}</code></pre>
//                                 <pre
//                                     className="text-white"><code>import {"{ ChatWidget }"} from &quot;@doclessai/sdk&quot;;</code></pre>
//                                 <pre className="text-white"><code> </code></pre>
//                                 <pre
//                                     className="text-white"><code>&lt;ChatWidget appKey=&quot;YOUR_KEY&quot; name=&quot;YOUR_ASSISTANT_NAME&quot; /&gt;</code></pre>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
//                         <div className="card-body p-6">
//                             <h3 className="card-title text-2xl text-secondary mb-2">Custom UI (Headless)</h3>
//                             <p className="text-sm opacity-70 mb-4">Total freedom. Use our client logic to feed your own
//                                 custom-built chat interface.</p>

//                             <div className="mockup-code bg-neutral text-white text-xs md:text-sm">
//                                 <span className="absolute top-3 right-3">
//                                     {copied === "headlessSdkCode" ? <Check className="w-6 h-6 text-success bg-success/10 rounded-full p-1" /> :
//                                         <Copy className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
//                                             onClick={() => copyToClipboard(headlessSdkCode, "headlessSdkCode")} />}
//                                 </span>
//                                 <pre
//                                     className="text-secondary italic"><code>{"// Use the client logic directly"}</code></pre>
//                                 <pre
//                                     className="text-white"><code>import {"{ DoclessClient }"} from &quot;@doclessai/sdk&quot;;</code></pre>
//                                 <pre className="text-white"><code> </code></pre>
//                                 <pre className="text-white"><code>const ai = new DoclessClient({"{"} </code></pre>
//                                 <pre className="text-white"><code>{"\t"}appKey: &quot;YOUR_KEY&quot; </code></pre>
//                                 <pre className="text-white"><code>{"}"});</code></pre>
//                                 <pre className="text-white"><code> </code></pre>
//                                 <pre className="italic"><code>{"// Send only query"}</code></pre>
//                                 <pre className="text-white"><code>const res = await ai.ask(userQuery);</code></pre>
//                                 <pre className="italic"><code>{"// Send query with user Image"}</code></pre>
//                                 <pre className="text-white"><code>const res = await ai.ask(userQuery, ImageFile);</code></pre>
//                                 <br />
//                                 <pre className="italic"><code>{"// Response format"}</code></pre>
//                                 <pre className="text-white"><code>{"{"}</code></pre>
//                                 <pre className="text-white"><code>{"\t"}{"res: string,          // AI response"}</code></pre>
//                                 <pre className="text-white"><code>{"\t"}{"image: string|null,   // image URL if relevant"}</code></pre>
//                                 <pre className="text-white"><code>{"\t"}{"route: string|null,   // app route for navigation"}</code></pre>
//                                 <pre className="text-white"><code>{"\t"}{"elementId: string|null // UI element to highlight"}</code></pre>
//                                 <pre className="text-white"><code>{"}"}</code></pre>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="flex flex-col gap-3">
//                 <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
//                     <span className="bg-primary text-primary-content w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-base">3</span>
//                     🎉 You&apos;re Live
//                 </h2>
//                 <p className="opacity-70">
//                     Your assistant is ready to guide users, answer questions, and navigate features inside your app.
//                 </p>
//             </section>

//             <p className="text-center opacity-60 text-sm mt-6">
//                 Secure key handling • multimodal responses • context-aware navigation
//             </p>
//         </div>
//     )
// }

const feature1 =
    [{
        name: "Export Data",
        description: "Users can export their data as CSV or JSON. Go to Settings → Data → Export, choose a format and date range. The export file is sent to the account email.",
        route: "/settings/export",
        elementId: "#export-button",
    }]
const feature2 = [{
    name: "Team Roles",
    description: "Manage user roles and permissions within your team. Go to Settings → Team → Roles to define and assign roles.",
    route: "/settings/team/roles",
}]


export default function Docs() {
    return (
        <div className="flex gap-5">
            <SideBar />
            <main className="docs-main">
                <div id="introduction">
                    <h1 className="page-title">DoclessAI SDK</h1>
                    <p className="page-desc">
                        Add a context-aware AI chat assistant to your application. Define
                        your app&apos;s features — users ask questions, the AI answers based on
                        what you&apos;ve defined.
                    </p>

                    <div className="callout callout-tip">
                        <span className="callout-icon">📦</span>
                        <p>
                            <strong>npm package: </strong>
                            <code className="inline">npm install @doclessai/sdk</code>
                            &nbsp;·&nbsp; Works with React, Next.js, and plain HTML.
                        </p>
                    </div>

                    <h2 className="doc-h2">What problem does DoclessAI solve?</h2>
                    <p className="doc-p">
                        Apps often have features users don&apos;t understand — and they don&apos;t
                        want to search through documentation to find answers. DoclessAI
                        embeds an AI assistant directly inside your application. The
                        assistant understands your app because <em>you</em> tell it what
                        your app does — through feature definitions you write in the
                        dashboard.
                    </p>
                    <p className="doc-p">
                        When a user asks &quot;How do I export my data?&quot;, the assistant doesn&apos;t
                        guess. It answers based on the export feature you defined, including
                        the exact route, element ID to highlight.
                    </p>

                    <h2 className="doc-h2">Two integration paths</h2>
                    <div className="my-4 mb-6 grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                        <div className="rounded-[11px] border border-(--border2) bg-(--bg2) p-4.5">
                            <div className="mb-2.25 text-[18px] leading-none">🧩</div>
                            <div className="text-[13.5px] font-semibold mb-1.5">
                                ChatWidget
                            </div>
                            <div className="text-[12.5px] text-(--muted2) leading-relaxed">
                                Drop-in React component. One JSX tag — full chat UI with
                                markdown, image support, and toast notifications.
                            </div>
                        </div>
                        <div className="bg-(--bg2) rounded-[11px] border border-[#FFFFFF0F] p-4.5">
                            <div className="mb-2.5 text-[18px]">🔧</div>
                            <div className="text-[13.5px] font-semibold mb-1.5">
                                DoclessClient
                            </div>
                            <div className="text-[12.5px] text-(--muted2) leading-relaxed">
                                Headless client. Build your own chat UI and call
                                <code className="inline">ai.ask()</code> to get AI responses.
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="doc-divider" />

                <div id="quickstart">
                    <h2 className="doc-h2">Quick Start</h2>
                    <p className="doc-p">
                        Get the assistant running in your app in a few steps.
                    </p>

                    <div className="step-row">
                        <div className="step-content">
                            <div className="flex gap-2 mb-2">
                                <div className="step-badge">1</div>
                                <h3>Install the package</h3>
                            </div>
                            <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                                <span className="file-name">Bash</span>
                                <div className="code-body text-start">
                                    <pre><span className="tk-bash"> npm install @doclessai/sdk</span></pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="step-row">
                        <div className="step-content">
                            <div className="flex gap-2 mb-2">
                                <div className="step-badge">2</div>
                                <h3>Set up your app in the dashboard</h3>
                            </div>
                            <p>
                                Go to the
                                <Link className="text-(--accent)" href="/user"> DoclessAI dashboard</Link>, create a new app, and copy your
                                <strong className="text-(--text)"> App Key</strong>. Store it in
                                your environment variables.
                            </p>
                            <div className="callout callout-warn">
                                <span className="callout-icon">⚠️</span>
                                <p>
                                    <strong>Security:</strong> Never hardcode your App Key in
                                    source code. Use{"\t"}
                                    <code className="inline">process.env.YOUR_KEY</code> or{"\t"}
                                    <code className="inline">.env.local</code>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="step-row">
                        <div className="step-content">
                            <div className="flex gap-2 mb-2">
                                <div className="step-badge">3</div>
                                <h3>Define your app&apos;s features</h3>
                            </div>
                            <p>
                                In the dashboard, add features as a JSON array. Each feature is
                                what your app can do — the AI answers questions using this
                                context.
                                <Link href="#features-json" className="text-(--accent)"> See feature format →</Link>
                            </p>
                        </div>
                    </div>

                    <div className="step-row">
                        <div className="step-content">
                            <div className="flex gap-2 mb-2">
                                <div className="step-badge">4</div>
                                <h3>Add the widget to your React app</h3>
                            </div>
                            <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                                <span className="file-name">App.tsx</span>
                                <div className="code-body max-w-64 text-start">
                                    <pre> <code><span className="tk-kw">import</span> <span className="tk-kw">{"{"}</span> <span className="tk-fn">ChatWidget</span> <span className="tk-kw">{"}"}</span> <span className="tk-kw">from</span> <span className="tk-str">{"'@doclessai/sdk'"}</span></code></pre>
                                    <pre> <code></code></pre>
                                    <pre> <code><span className="tk-kw">export default function</span> <span className="tk-fn">App</span><span className="text-[#3b4460]">{"()"}</span><span className="tk-kw">{"\t{"}</span></code></pre>
                                    <pre> <code className="tk-kw">{"\t\treturn ("}</code></pre>
                                    <pre> <code className="tk-kw">{`\t\t\t<div>`}</code></pre>
                                    <pre> <code className="tk-cmt">{"\t\t\t\t{/* AI assistant is now live */}"}</code></pre>
                                    <pre> <code><span className="tk-kw">{"\t\t\t\t<ChatWidget"}</span><span className="tk-prop">{" appKey"}</span><span className="tk-kw">{"="}</span><span className="tk-str">{`"your-app-key"`}</span><span className="tk-prop">{" name"}</span><span className="tk-kw">=</span><span className="tk-str">{`"your-assistant-name"`}</span><span className="tk-kw">{" />"}</span></code></pre>
                                    <pre> <code className="tk-kw">{"\t\t\t</div>"}</code></pre>
                                    <pre> <code className="tk-kw">{"\t\t)"}</code></pre>
                                    <pre> <code className="tk-kw">{"}"}</code></pre>
                                </div>
                            </div>
                            <div className="callout callout-tip">
                                <span className="callout-icon">✅</span>
                                <p>
                                    <strong>Done.</strong> The floating chat button is now in your
                                    app. Users ask questions, the AI answers based on your feature
                                    definitions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="doc-divider" />

                <div id="dashboard-setup">
                    <h2 className="doc-h2">Dashboard Setup</h2>
                    <p className="doc-p">
                        The dashboard is where you manage your apps and the features the AI
                        knows about.
                    </p>

                    <h3 className="doc-h3">Creating an app</h3>
                    <p className="doc-p">
                        Go to the dashboard and click
                        <strong className="text-(--text)"> Create App</strong>. Fill in:
                    </p>
                    <ul className="check-list">
                        <li>
                            <span className="chk">→</span>
                            <span>
                                <strong className="text-(--text)"> App name</strong> — displayed
                                to users in the chat widget
                            </span>
                        </li>
                        <li>
                            <span className="chk">→</span>
                            <span>
                                <strong className="text-(--text)"> Contact email</strong> —
                                associated with this app
                            </span>
                        </li>
                        <li>
                            <span className="chk">→</span>
                            <span>
                                <strong className="text-(--text)"> App description</strong> —
                                tells the AI what your app is about overall
                            </span>
                        </li>
                        <li>
                            <span className="chk">→</span>
                            <span>
                                <strong className="text-(--text)"> Gemini API Key</strong> — your
                                own Gemini key, used to power the AI responses for this app
                            </span>
                        </li>
                        <li>
                            <span className="chk">→</span>
                            <span>
                                <strong className="text-(--text)"> App Features (JSON)</strong> —
                                the feature definitions the AI learns from
                            </span>
                        </li>
                    </ul>
                    <p className="doc-p">
                        After creation, you receive your
                        <strong className="text-(--text)"> App Key</strong> — this is what
                        you pass to the SDK.
                    </p>
                </div>

                <hr className="doc-divider" />

                <div id="features-json">
                    <h2 className="doc-h2">Defining Features</h2>
                    <p className="doc-p">
                        Features are how you give the AI knowledge about your app. Write
                        them as a JSON array in the dashboard. Each feature object describes
                        one capability of your app.
                    </p>

                    <h3 className="doc-h3">Feature structure</h3>
                    <div className="mockup-code" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">JSON</span>
                        <div className="code-body text-start">
                            <pre> <code className="text-(--muted)">{"["}</code></pre>
                            <pre> <code className="text-(--muted)">{"\t{"}</code></pre>
                            {feature1.map((feat, idx) => (
                                <div key={idx}>
                                    <pre> <code className="tk-prop">{"\t\t\"name\":"}</code> <code className="tk-str">{`"${feat.name}"`}</code></pre>
                                    <pre> <code className="tk-prop">{"\t\t\"description\":"}</code> <code className="tk-str">{`"${feat.description}"`}</code></pre>
                                    <pre> <code className="tk-prop">{"\t\t\"route\":"}</code> <code className="tk-str">{`"${feat.route}"`}</code></pre>
                                    <pre> <code className="tk-prop">{"\t\t\"elementId\":"}</code> <code className="tk-str">{`"${feat.elementId}"`}</code></pre>
                                </div>
                            ))}
                            <pre> <code className="text-(--muted)">{"\t},"}</code></pre>
                            <pre> <code className="text-(--muted)">{"\t{"}</code></pre>
                            {feature2.map((feat, idx) => (
                                <div key={idx}>
                                    <pre> <code className="tk-prop">{"\t\t\"name\":"}</code> <code className="tk-str">{`"${feat.name}"`}</code></pre>
                                    <pre> <code className="tk-prop">{"\t\t\"description\":"}</code> <code className="tk-str">{`"${feat.description}"`}</code></pre>
                                    <pre> <code className="tk-prop">{"\t\t\"route\":"}</code> <code className="tk-str">{`"${feat.route}"`}</code></pre>
                                </div>
                            ))}
                            <pre> <code className="text-(--muted)">{"\t},"}</code></pre>
                            <pre> <code className="text-(--muted)">{"]"}</code></pre>
                        </div>
                    </div>

                    <h3 className="doc-h3 mt-4">Feature fields</h3>
                    <div className="overflow-x-auto">
                        <table className="prop-table">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>name</td>
                                    <td>string</td>
                                    <td className="req">Required</td>
                                    <td>Short name for the feature (e.g. "Export Data").</td>
                                </tr>
                                <tr>
                                    <td>description</td>
                                    <td>string</td>
                                    <td className="req">Required</td>
                                    <td>
                                        Detailed explanation. The more detail, the better the AI
                                        answers. Describe exact steps, locations, and behavior.
                                    </td>
                                </tr>
                                <tr>
                                    <td>route</td>
                                    <td>string</td>
                                    <td className="text-[11px] text-(--muted2)">Optional</td>
                                    <td>
                                        App route to navigate to (e.g.
                                        <code className="inline">/settings/export</code>). Returned in the
                                        response so your app can redirect the user.
                                    </td>
                                </tr>
                                <tr>
                                    <td>elementId</td>
                                    <td>string</td>
                                    <td className="text-[11px] text-(--muted2)">Optional</td>
                                    <td>
                                        A DOM element ID (e.g.
                                        <code className="inline">#export-button</code>). Returned so your
                                        app can highlight or scroll to the relevant UI element.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout callout-info">
                        <span className="callout-icon">💡</span>
                        <p>
                            <strong>Write good descriptions.</strong> The description field is
                            the most important. Write it like you&apos;re explaining the feature to
                            a new user — include navigation steps, conditions, and what the
                            outcome is. Vague descriptions produce vague answers.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}