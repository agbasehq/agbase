export const Footertabs: FooterTypes[] = [
    {
        title: "Product",
        tabs: [
            { title: "Features", href: "#features" },
            { title: "Documentation", href: "/docs" },
            { title: "Dashboard", href: "/user" }
        ]
    },
    {
        title: "Developers",
        tabs: [
            { title: "Github", href: "https://github.com/Dattatray8/doclessai-sdk" },
            { title: "npm", href: "https://www.npmjs.com/package/@doclessai/sdk" },
            { title: "Quickstart", href: "/docs#quickstart" }
        ]
    },
    {
        title: "Legal",
        tabs: [
            { title: "Privacy Policy", href: "/privacy" },
            { title: "Terms of Service", href: "/privacy#terms" }
        ]
    }
]

export const features: Feature[] = [
        {
            icon: "🧠",
            title: "Context-Aware AI",
            description: "The assistant answers based on the features you define — grounded, specific responses for your app. Not generic chatbot answers.",
            className: "fi-v"
        },
        {
            icon: "⚡",
            title: "Drop-In Widget",
            description: "One import, one JSX tag. ChatWidget handles the full UI — chat panel, markdown, image support, and toast notifications.",
            className: "fi-b"
        },
        {
            icon: "🖼",
            title: "Multimodal Responses",
            description: "Add image URLs to your features. The assistant returns relevant images alongside text when users ask about visual parts of your app.",
            className: "fi-g"
        },
        {
            icon: "♻️",
            title: "Real-Time Context Sync",
            description: "Edit or add features in the dashboard — the AI's knowledge updates instantly, no redeploy needed.",
            className: "fi-v"
        },
        {
            icon: "🔧",
            title: "Headless SDK",
            description: "Want full control over the UI? Use DoclessClient directly. Build your own chat interface, powered by our intelligence layer.",
            className: "fi-b"
        },
        {
            icon: "🎯",
            title: "TypeScript First",
            description: "Complete TypeScript types ship with the package. Autocomplete, type safety, zero guessing.",
            className: "fi-a"
        },
]

export const steps: Steps[] = [
        {
            id: "01",
            icon: "🗂",
            title: "Create your app",
            desc: "Register in the dashboard, give your app a name, describe its purpose, and get your App Key."
        },
        {
            id: "02",
            icon: "✏️",
            title: "Define features",
            desc: "Add your app's features and descriptions as JSON. The AI uses this as its knowledge base."
        },
        {
            id: "03",
            icon: "📦",
            title: "Install the SDK",
            desc: "npm install @doclessai/sdk. Add ChatWidget or use DoclessClient for a custom UI."
        },
        {
            id: "04",
            icon: "🤖",
            title: "Users get answers",
            desc: "Your users ask questions through the chat widget. The AI answers based on your defined features."
        }
]