export default async function handler(req, res) {
    const { url } = req.query;
    const token = "007c7643f181104371e583667baccece44de71ab";

    try {
        const response = await fetch(url, {
            method: req.method,
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
