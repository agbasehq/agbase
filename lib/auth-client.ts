import { createAuthClient } from "better-auth/react";

const useDashboardProxy = process.env.NEXT_PUBLIC_AGBASE_PROXY_AUTH === "true";

export const authClient = createAuthClient(
    useDashboardProxy
        ? { basePath: "/api/dashboard/auth" }
        : { baseURL: process.env.NEXT_PUBLIC_AGBASE_AUTH_URL || "http://localhost:3001/api/auth" },
);
