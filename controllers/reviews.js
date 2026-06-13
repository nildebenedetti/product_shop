import pool from "../utils/db.js";
import { generateCurrentDate } from "../utils/functions.js";
import {
    querySelectAllReviews,
    querySelectFeaturedReviews,
    queryShowAllProductReviews,
    queryCreateReview,
    queryDestroyReview
} from "../utils/queries.js";

async function index(request, response) {
    try {
        // Conterrà i valori da inserire al posto di ? nella query.
        const values = [];

        // Se il middleware ha validato start_rating, aggiunge il filtro alla query.
        if (request.rating !== undefined) {
            querySelectAllReviews += " WHERE start_rating = ?";
            values.push(request.rating);
        }

        console.log("Parametro ricevuto:", request.rating);
        console.log("Query eseguita:", querySelectAllReviews, values);

        // Esegue la query.
        // Senza filtro la query restituisce tutte le recensioni.
        // Con il filtro start_rating restituisce solo quelle con il voto richiesto.
        const [rows] = await pool.execute(querySelectAllReviews, values);

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

async function showFeaturedReviews(request, response) {
    const realId = request.realId;

    try {
        // Cerca nel database la recensione con l'id richiesto, il valore realId viene associato al segnaposto ?.
        const [rows] = await pool.execute(
            querySelectFeaturedReviews, [realId]
        );
        // N - ho tolto la validazione perchè se un prodotto ha 0 reviews,
        // non va lanciato errore ma mostrato solo un array vuoto
        if (rows.length === 0) {
            response.status(200).json({
                error: null,
                results: []
            });
            return;
        }

        // Restituisce arrai di reviews.
        response.status(200)
            .json({
                error: null,
                results: rows
            });
    } catch (error) {
        console.error(
            "errore durante il recupero della recensione",
            error.message
        );
        // Gestisce eventuali problemi del server o del database.
        response.status(500)
            .json({
                error: 'errore interno del server nel recupero della recensione',
                results: null
            });
    }
}

async function show(request, response) {
    const realId = request.realId;

    try {
        // Cerca nel database la recensione con l'id richiesto, il valore realId viene associato al segnaposto ?.
        const [rows] = await pool.execute(
            queryShowAllProductReviews, [realId]
        );
        // N - ho tolto la validazione perchè se un prodotto ha 0 reviews,
        // non va lanciato errore ma mostrato solo un array vuoto
        if (rows.length === 0) {
            response.status(200).json({
                error: null,
                results: []
            });
            return;
        }

        // Restituisce arrai di reviews.
        response.status(200)
            .json({
                error: null,
                results: rows
            });
    } catch (error) {
        console.error(
            "errore durante il recupero della recensione",
            error.message
        );
        // Gestisce eventuali problemi del server o del database.
        response.status(500)
            .json({
                error: 'errore interno del server nel recupero della recensione',
                results: null
            });
    }
}

async function create(request, response) {
    const {
        realTitle,
        realBody,
        rating,
        realAuthorName,
        realProductId
    } = request.body;

    const submissionDate = generateCurrentDate();

    try {
        // Inserisce la nuova recensione nel database i valori vengono associati ai segnaposto ? nello stesso ordine.
        const [result] = await pool.execute(
            queryCreateReview,
            [
                realTitle,
                realBody,
                rating,
                realAuthorName,
                submissionDate,
                0,
                realProductId
            ]
        );

        // Restituisce i dati principali della recensione appena creata.
        response.status(201).json({
            error: null,
            results: {
                id: result.insertId, 
                title: realTitle,
                body: realBody,
                start_rating: rating,
                author_name: realAuthorName,
                submission_date: submissionDate,
                find_it_useful: 0,
                product_id: realProductId
            }
        });
    } catch (error) {
        console.error(
            "Errore durante la creazione della recensione",
            error.message
        );

        response.status(500).json({
            error: "Errore interno del server durante la creazione della recensione",
            results: null
        });
    }
}


async function destroy(request, response) {
    const realId = request.realId;
    
    try {
        const [rows] = await pool.execute(
            queryDestroyReview, [realId]
        );
        
        if ( rows.affectedRows === 0 ) {
            response.status(404)
                .json({
                    error: `non è presente alcuna recensione con id ${realId}`,
                    results: null
                });
                return;
        }

        response.sendStatus(204) // la cancellazione andata a buon fine vuole response 'no content'
    } catch (error) {
        response.status(500).json({
            error: `Errore interno del server durante la cancellazione della recensione con id ${realId}`,
            results: null
        });
    }
}


export { index, show, showFeaturedReviews, create, destroy };