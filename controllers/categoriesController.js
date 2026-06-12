import pool from '../utils/db.js';
import { normalizeProduct } from '../utils/functions.js';

// funzione che gestisce la richiesta GET per ottenere tutte le categorie
const index = async (request, response) => {


    const querySelectAllCategoriesandProducts = `    SELECT 
    c.id as category_id, c.name AS category_name, c.short_description AS category_short_description, p.id AS product_id, p.name as product_name, p.price as price, p.image_url as imageUrl
    FROM categories c
    LEFT JOIN category_product cp ON c.id = cp.category_id
    LEFT JOIN products p ON p.id = cp.product_id`;


    try {
        // eseguo la query per ottenere tutte le categorie dal database
        const [categories] = await pool.query(querySelectAllCategoriesandProducts);
        // va fatto un for sui risultati che prende la riga duplicata e prendere solo la categoria
        // perche ci sono i duplicati 
        // un array di prodotto che in ca

        /*
        [
            {
                id: 1
                name: "Pizza",
                description: "...",
                price: 90.8,
                categories: [
                    {
                        name: "Categoria1"
                        description: ""
                    },
                    {
                        name: "Categoria2",
                        description: ""
                    }
                ]
            }
        ]
        */


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

    const categoryId = request.realId; // passato gia ddai controlli

    const querySelectProductByCateogryId = `
    SELECT p.*
    FROM products p
    JOIN category_product pc 
    ON p.id = pc.product_id
    JOIN categories c ON pc.category_id = c.id
    WHERE c.id = ? ;`;



    try {
        const [rows] = await pool.query(querySelectProductByCateogryId, [categoryId]);
        // SE NON CI SONO PRODOTTI
        if (rows.length === 0) {
            return response.status(404).json({
                error: 'Nessun prodotto trovato per questa categoria',
                results: []
            });
        }
        // normalizzo i prodotti
        const normalizedProducts = rows.map(normalizeProduct)

        response.json({
            error: null,
            results: normalizedProducts
        })

    } catch (error) {
        response.status(500)
            .json({
                error: 'errore interno del server nel recupero della categoria del prodotto',
                resutls: null
            });
        return;

    }

};

export { index, show };