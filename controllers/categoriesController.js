import pool from '../utils/db.js';

// funzione che gestisce la richiesta GET per ottenere tutte le categorie
const index = async (request, response) => {
    try {
        // eseguo la query per ottenere tutte le categorie dal database
        const [categories] = await connection.query('SELECT * FROM categories');

        // rispondo con i dati in formato JSON
        response.json({
            error: null,
            results: categories
        });
    } catch (error) {
        // in caso di errore, rispondo con un messaggio di errore e lo status code 500
        response.status(500)
            .json({
                error: 'Errore del server',
                results: null
            });
    }
};

async function show(request, response) {
    const realId = request.realId

    try {
        const [rows] = await pool.query(
            'SELECT * FROM `products` WHERE id = ?', [realId]
        );

        if (rows.length === 0) {
            response.status(404)
                .json({ error: `Prodotto ${realId} non trovato`, results: null });
            return;
        }

        response.status(200).json({ error: null, results: rows[0] });
    } catch (error) {
        console.error("errore durante il recupero del prodotto", error.message);
        response.status(500)
            .json({
            error: 'errore interno del server nel recupero del prodotto',
            results: null
        });
    }
}

export { index, show };