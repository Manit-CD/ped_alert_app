export default async function handler(req, res) {
    const { url } = req.query; // Extract the backend URL from the query parameters
    const token = process.env.AUTH_TOKEN; // Your token

    try {
        // Forward the request to the backend
        const response = await fetch(url, {
            method: req.method, // Use the same HTTP method as the original request
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        // Get the response data from the backend
        const data = await response.json();

        // Send the response back to the frontend
        res.status(response.status).json(data);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Internal Server Error" });
    }
}
