export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const { password } = req.body || {};

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required."
            });
        }

        const ownerPassword = process.env.OWNER_PASSWORD;

        if (!ownerPassword) {
            console.error("OWNER_PASSWORD is not configured.");

            return res.status(500).json({
                success: false,
                message: "Owner authentication is not configured."
            });
        }

        if (password !== ownerPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect owner password."
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}
