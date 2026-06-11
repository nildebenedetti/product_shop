import pool from "../utils/db.js";

async function index(request, response) {
    try {
        // Recupera dall'URL il parametro star_rating.
        const { start_rating } = request.query;

        // Query di partenza se non viene specificato alcun filtro.
        let sql = "SELECT * FROM reviews";
        // Conterrà i valori da inserire al posto di ? nella query.
        const values = [];

        // Se nell'URL è presente il parametro star_rating converte il valore ricevuto da stringa a numero per poter verificare che sia un voto valido.
        if (start_rating !== undefined) {
            const rating = Number(star_rating);

            // Il valore deve essere un numero intero compreso tra 1 e 5.
            if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
                return response.status(400).json({
                    error: "star_rating deve essere un numero intero compreso tra 1 e 5",
                    results: null
                });
            }

            // Aggiunge alla query il filtro per il numero di stelle.
            sql += " WHERE star_rating = ?";
            // Il valore di rating viene inserito nell'array values.
            values.push(rating);
        }

        // Esegue la query.
        // senza filtro values restituisce tutte le recensioni.
        // con il filtro star_rating restituisce solo quelle con il voto richiesto.
        const [rows] = await pool.query(sql, values);

        // Anche se non sono presenti recensioni non viene restituito un errore perché un risultato vuoto è possibile.
        if (rows.length === 0) {
            return response.json({
                error: null,
                message: "Nessuna recensione trovata",
                results: []
            });
        }

        // Restituisce le recensioni trovate.
        response.json({
            error: null,
            results: rows
        });
    } catch (error) {
        console.error(error);

        // Gestisce eventuali problemi del server o del database.
        response.status(500).json({
            error: "Errore interno del server",
            results: null
        });
    }
}

export { index };