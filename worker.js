async function handleRequest(request) {
    const endpoints = [
        "https://sub1.example.com",
        "https://sub2.example.com",
        "vless://example.com"
    ];

    const responses = [];

    for (const endpoint of endpoints) {
        if (endpoint.startsWith("https://")) {
            try {
                const response = await fetch(endpoint);
                const content = await response.text();
                responses.push(content);
            } catch (error) {
                responses.push("Error fetching content: " + error.message);
            }
        } else {
            responses.push(endpoint);
        }
    }

    return new Response(responses.join("\r\n"), { status: 200 });
}

export default {
    async fetch(request, env) {
        return handleRequest(request);
    },
};