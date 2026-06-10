async function index(request, response) {
    try {
        const [rows] = await connection.query("SELECT * FROM reviews");

        if (rows.length === 0) {
            return response.status(404).json({
                error: "Nessuna recensione trovata",
                results: null
            });
        }

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