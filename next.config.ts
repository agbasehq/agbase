import type {NextConfig} from "next";

import { getApiOrigin } from "./lib/api-origin";

const nextConfig: NextConfig = {
    async rewrites() {
        const origin = getApiOrigin();
        return [
            { source: "/api/dashboard/auth/:path*", destination: origin + "/api/dashboard/auth/:path*" },
            { source: "/api/dashboard/user", destination: origin + "/user" },
            { source: "/api/dashboard/app/:path*", destination: origin + "/app/:path*" },
        ];
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
