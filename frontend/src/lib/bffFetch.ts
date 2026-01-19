function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

export async function bffFetch(path: string, init: RequestInit = {}) {
    const method = (init.method ?? "GET").toUpperCase();
    const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    const headers = new Headers(init.headers);

    if (isWrite) {
        const token = getCookie("XSRF-TOKEN");
        if (token) headers.set("X-XSRF-TOKEN", decodeURIComponent(token));
    }

    return fetch(path, { ...init, headers, credentials: "include" });
}