import { BASE_URL } from "./config.js";

export async function uploadDocument(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/documents/upload`, {
        method: "POST",
        headers: { "ngrok-skip-browser-warning": "true" },
        body: formData,
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    return await response.json();
}