export default async function handler(req, res) {
    const { url } = req.query;
    const token = "b36eabc1a755b335ba1c38945d924f05a9ac824d";

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
