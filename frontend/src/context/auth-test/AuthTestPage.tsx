import { useState } from "react";
import {bffFetch} from "@/lib/bffFetch.ts";



export default function AuthTestPage() {
    const [me, setMe] = useState<unknown>(null);
    const [status, setStatus] = useState<string>("");

    async function loadMe() {
        setStatus("");

        const res = await bffFetch("/api/me");

        if (res.status === 401) {
            setStatus("Not logged in. Click Login.");
            return;
        }
        if (!res.ok) {
            setStatus(`Error: ${res.status}`);
            return;
        }

        // Logged in: bootstrap CSRF *now*
        await bffFetch("/api/csrf");

        setMe(await res.json());
        setStatus("Loaded /api/me");
    }

    async function testWrite() {
        setStatus("");
        await bffFetch("/api/csrf"); // must be logged in first
        const res = await bffFetch("/api/test-write", { method: "POST" });
        setStatus(`POST /api/test-write -> ${res.status}`);
    }

    async function logout() {
        setStatus("");

        // Only try logout if you have a session
        const csrfRes = await bffFetch("/api/csrf");
        if (csrfRes.status === 401) {
            setMe(null);
            setStatus("Already logged out.");
            return;
        }

        const res = await bffFetch("/logout", { method: "POST" });
        setMe(null);
        setStatus(`POST /logout -> ${res.status}`);
        window.location.href = "/";
    }

    return (
        <div style={{ padding: 16, fontFamily: "system-ui" }}>
            <h2>BFF Auth Test</h2>

            <button
                onClick={() => {
                    window.location.href = "/oauth2/authorization/keycloak";
                }}
            >
                Login
            </button>

            <button style={{ marginLeft: 12 }} onClick={loadMe}>
                Load /api/me
            </button>

            <button style={{ marginLeft: 12 }} onClick={testWrite}>
                POST /api/test-write
            </button>

            <button onClick={logout}>
                Logout
            </button>

            <div style={{ marginTop: 12 }}>{status}</div>

            <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
        {me ? JSON.stringify(me, null, 2) : "No /api/me yet"}
      </pre>
        </div>
    );
}