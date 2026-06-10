async function index(request, response) {
    try {
        const [rows] = await connection.query("SELECT * FROM reviews");

        response.json({
            error: null,
            results: rows
        });
    } catch (error) {
        console.error(error);

        response.status(500).json({
            error: "Errore interno del server",
            results: null
        });
    }
}

export { index };