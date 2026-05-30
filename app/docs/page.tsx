'use client'

import SideBar from "@/components/docs/SideBar";
import "./docs.css"
import Link from "next/link";

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
                    <h1 className="page-title">AGBase SDK</h1>
                    <p className="page-desc">
                        Add a context-aware AI chat assistant to your application. Define
                        your app&apos;s features — users ask questions, the AI answers based on
                        what you&apos;ve defined.
                    </p>

                    <div className="callout callout-tip">
                        <span className="callout-icon">📦</span>
                        <p>
                            <strong>npm package: </strong>
                            <code className="inline">npm install @agbase/sdk</code>
                            &nbsp;·&nbsp; Works with React, Next.js, and plain HTML.
                        </p>
                    </div>

                    <h2 className="doc-h2">What problem does AGBase solve?</h2>
                    <p className="doc-p">
                        Apps often have features users don&apos;t understand — and they don&apos;t
                        want to search through documentation to find answers. AGBase
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
                                <span className="file-name">BASH</span>
                                <div className="code-body text-start">
                                    <pre><span className="tk-bash"> npm install @agbase/sdk</span></pre>
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
                                <Link className="text-(--accent)" href="/user"> AGBase dashboard</Link>, create a new app, and copy your
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
                                <span className="file-name">TSX</span>
                                <div className="code-body max-w-64 text-start">
                                    <pre> <code><span className="tk-kw">import</span> <span className="tk-kw">{"{"}</span> <span className="tk-fn">ChatWidget</span> <span className="tk-kw">{"}"}</span> <span className="tk-kw">from</span> <span className="tk-str">{"'@agbase/sdk'"}</span></code></pre>
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

                <hr className="doc-divider" />

                <div id="chat-widget">
                    <h2 className="doc-h2">ChatWidget (React)</h2>
                    <p className="doc-p">
                        The simplest way to add the AI assistant. Works in React and Next.js
                        projects.
                    </p>

                    <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">TSX</span>
                        <div className="code-body text-start">
                            <pre> <code><span className="tk-kw">import</span> <span className="tk-kw">{"{"}</span> <span className="tk-fn">ChatWidget</span> <span className="tk-kw">{"}"}</span> <span className="tk-kw">from</span> <span className="tk-str">{"'@agbase/sdk'"}</span></code></pre>
                            <br />
                            <pre> <code><span className="tk-kw">{"<ChatWidget"}</span><span className="tk-prop">{"\n\t\tappKey"}</span><span className="tk-kw">{"="}</span><span className="tk-str">{`"your-app-key"`}</span><span className="tk-prop">{"\n\t\tname"}</span><span className="tk-kw">=</span><span className="tk-str">{`"your-assistant-name"`}</span><span className="tk-kw">{"\n\t/>"}</span></code></pre>
                        </div>
                    </div>

                    <h3 className="doc-h3 mt-4">Props</h3>
                    <div className="overflow-x-auto">
                        <table className="prop-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>appKey</td>
                                    <td>string</td>
                                    <td className="req">Required</td>
                                    <td>Your App Key from the AGBase dashboard.</td>
                                </tr>
                                <tr>
                                    <td>name</td>
                                    <td>string</td>
                                    <td className="req">Required</td>
                                    <td>Display name of your assistant shown in the chat panel.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="doc-h3">What&apos;s included</h3>
                    <ul className="check-list">
                        <li>
                            <span className="chk">✓</span> Floating chat button that opens a full
                            chat panel
                        </li>
                        <li>
                            <span className="chk">✓</span> Markdown rendering in responses (bold,
                            code, lists)
                        </li>
                        <li>
                            <span className="chk">✓</span> Image upload — users send images, AI
                            analyzes them
                        </li>
                        <li><span className="chk">✓</span> Toast notifications for errors</li>
                        <li><span className="chk">✓</span> Fully responsive on mobile</li>
                        <li>
                            <span className="chk">✓</span> Feature navigation (uses
                            <code className="inline">route</code> from response)
                        </li>
                    </ul>
                </div>

                <hr className="doc-divider" />

                <div id="html-script">
                    <h2 className="doc-h2">HTML Script Tag</h2>
                    <p className="doc-p">
                        Not using React? Add the assistant to any HTML page with a single
                        script tag — no build step needed.
                    </p>

                    <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">HTML</span>
                        <pre> <span className="tk-cmt">&lt;!-- Before closing &lt;/body&gt; --&gt;</span></pre>
                        <pre> <span className="tk-kw">{"<script"}</span></pre>
                        <pre> <span className="tk-prop">{"\t\tsrc"}</span><span className="tk-kw">=</span><span className="tk-str">{"\"https://cdn.jsdelivr.net/npm/@doclessai/sdk@0.3.5/dist/loader.standalone.js\""}</span></pre>
                        <pre> <span className="tk-prop">{"\t\tdata-app-key"}</span><span className="tk-kw">=</span><span className="tk-str">{"\"your-app-key-here\""}</span></pre>
                        <pre> <span className="tk-prop">{"\t\tdata-name"}</span><span className="tk-kw">=</span><span className="tk-str">{"\"YOUR_ASSISTANT_NAME\""}</span></pre>
                        <pre> <span className="tk-kw">{"></script>"}</span></pre>
                    </div>

                    <div className="callout callout-info">
                        <span className="callout-icon">ℹ️</span>
                        <p>
                            The script auto-initializes when the page loads. Works with any
                            HTML page.
                        </p>
                    </div>
                </div>

                <hr className="doc-divider" />

                <div id="headless">
                    <h2 className="doc-h2">DoclessClient (Headless)</h2>
                    <p className="doc-p">
                        Use the client directly if you want to build your own chat UI. You
                        handle the interface — we handle the AI.
                    </p>

                    <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">TYPESCRIPT</span>
                        <pre> <span className="tk-kw">import</span> {"{ "} <span className="tk-fn">DoclessClient</span> {" }"} <span className="tk-kw">from</span> <span className="tk-str">{"'@agbase/sdk'"}</span></pre>
                        <br />
                        <pre> <span className="tk-kw">const</span> <span className="doc-p">ai = </span><span className="tk-kw">new</span> <span className="tk-fn">DoclessClient</span><span className="tk-kw">({"{"}</span></pre>
                        <pre> <span className="tk-prop">{"\tappKey"}</span>: <span className="tk-str">{"'your-app-key-here'"}</span></pre>
                        <pre> <span className="tk-kw">{"})"}</span></pre>
                        <br />
                        <pre> <span className="tk-cmt">{"// Text query"}</span></pre>
                        <pre> <span className="tk-kw">const</span> <span className="doc-p">res = </span><span className="tk-kw">await</span> <span className="doc-p">ai</span>.<span className="tk-fn">ask</span><span className="doc-p">(userQuery)</span></pre>
                        <br />
                        <pre> <span className="tk-cmt">{"// Text + image"}</span></pre>
                        <pre> <span className="tk-kw">const</span> <span className="doc-p">res = </span><span className="tk-kw">await</span> <span className="doc-p">ai</span>.<span className="tk-fn">ask</span><span className="doc-p">(userQuery, imageFile)</span></pre>
                        <pre className="mt-4"> <span className="tk-cmt">{"// Use the response"}</span></pre>
                        <pre> <span className="doc-p">console.</span><span className="tk-fn">log</span><span className="doc-p">(res.res)</span>       <span className="tk-cmt">{"// AI answer text"}</span></pre>
                        <pre> <span className="doc-p">console.</span><span className="tk-fn">log</span><span className="doc-p">(res.route)</span>     <span className="tk-cmt">{"// route to navigate to"}</span></pre>
                        <pre> <span className="doc-p">console.</span><span className="tk-fn">log</span><span className="doc-p">(res.elementId)</span> <span className="tk-cmt">{"// DOM element to highlight"}</span></pre>
                    </div>
                </div>

                <hr className="doc-divider" />

                <div id="nextjs">
                    <h2 className="doc-h2">Next.js Setup</h2>
                    <p className="doc-p">
                        ChatWidget is a client component. Use
                        <code className="inline">{"\"use client\""}</code> and pass your key via
                        environment variable.
                    </p>

                    <h3 className="doc-h3">.env.local</h3>
                    <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">BASH</span>
                        <pre> <span className="tk-prop">NEXT_PUBLIC_AGBASE_KEY</span>=<span className="tk-str">your-app-key-here</span></pre>
                    </div>

                    <h3 className="doc-h3 mt-4">app/layout.tsx (App Router)</h3>
                    <div className="mockup-code w-full mt-4" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">TSX</span>
                        <pre> <span className="tk-str">{"'use client'"}</span></pre>
                        <pre> <span className="tk-kw">import</span> {"{ "} <span className="tk-fn">ChatWidget</span> {" }"} <span className="tk-kw">from</span> <span className="tk-str">{"'@agbase/sdk'"}</span></pre>
                        <br />
                        <pre> <span className="tk-kw">export default function</span> <span className="tk-fn">RootLayout</span><span className="doc-p">({"{"}</span> <span className="tk-prop">children</span> <span className="doc-p">{"}"}: {"{"}</span> <span className="tk-prop">children</span>: <span className="tk-fn">React.ReactNode</span> <span className="doc-p">{"}"}) {"{"}</span></pre>
                        <pre> <span className="tk-kw">{"\treturn ("}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t<html>"}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t\t<body>"}</span></pre>
                        <pre> <span className="doc-p">{"\t\t\t\t{children}"}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t\t\t<"}</span><span className="tk-kw">ChatWidget</span></pre>
                        <pre> <span className="tk-prop">{"\t\t\t\t\tappKey"}</span><span className="doc-p">=</span><span className="tk-kw">{"{process.env.NEXT_PUBLIC_AGBASE_KEY}"}</span></pre>
                        <pre> <span className="tk-prop">{"\t\t\t\t\tname"}</span><span className="doc-p">=</span><span className="tk-str">{"\"Aria\""}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t\t\t/>"}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t\t</body>"}</span></pre>
                        <pre> <span className="tk-kw">{"\t\t</html>"}</span></pre>
                        <pre> <span className="tk-kw">{"\t)"}</span></pre>
                        <pre> <span className="doc-p">{"}"}</span></pre>

                    </div>
                </div>
                
                <hr className="doc-divider" />

                <div id="response-format">
                    <h2 className="doc-h2">Response Format</h2>
                    <p className="doc-p">
                        Both ChatWidget and
                        <code className="inline">DoclessClient.ask()</code> return the same
                        response shape:
                    </p>
                    <div className="mockup-code w-full" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">TYPESCRIPT</span>
                        <pre> <span className="doc-p">{"{"}</span></pre>
                        <pre> <span className="tk-prop">{"\t\tres"}</span>: <span className="tk-kw">string</span>           <span className="tk-cmt">{"// AI's text answer (markdown supported)"}</span></pre>
                        <pre> <span className="tk-prop">{"\t\troute"}</span>: <span className="text-[#c084fc]">string | null</span>   <span className="tk-cmt">{"// App route to navigate to"}</span></pre>
                        <pre> <span className="tk-prop">{"\t\telementId"}</span>: <span className="text-[#c084fc]">string | null</span> <span className="tk-cmt">{"// DOM element to highlight"}</span></pre>
                        <pre> <span className="doc-p">{"}"}</span></pre>
                    </div>
                </div>

                <hr className="doc-divider" />

                <div id="typescript" className="mb-10">
                    <h2 className="doc-h2">TypeScript Types</h2>
                    <div className="mockup-code text-start" style={{ background: '#111520', border: '1px solid #111520' }}>
                        <span className="file-name">TYPESCRIPT</span>
                        <pre> <span className="tk-kw">import</span> <span className="doc-p">{"{ "}</span><span className="text-[#c084fc]">AssistantResponse</span> <span className="doc-p">{"}"} </span><span className="tk-kw">from</span> <span className="tk-str">{"'@agbase/sdk'"}</span></pre>
                        <br />
                        <pre> <span className="tk-kw">const</span> <span className="doc-p">res:</span><span className="text-[#c084fc]"> AssistantResponse</span> <span className="doc-p">=</span> <span className="tk-kw">await</span> <span className="doc-p">ai</span>.<span className="tk-fn">ask</span><span className="doc-p">(</span><span className="tk-str">{"'How do I export data?'"}</span><span className="doc-p">)</span></pre>
                    </div>
                </div>
            </main >
        </div >
    )
}