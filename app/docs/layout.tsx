import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get Started With AGBase",
};

export default function DocumentationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
