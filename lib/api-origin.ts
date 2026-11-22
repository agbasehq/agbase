export function getApiOrigin() {
    return (process.env.AGBASE_API_ORIGIN || "http://localhost:3001").replace(/\/+$/, "");
}
