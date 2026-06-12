import pool from '../utils/db.js';

// funzione che gestisce la richiesta GET per ottenere tutte le categorie
const index = async (request, response) => {
    const querySelectAll = 'SELECT * FROM categories';
    try {
        // eseguo la query per ottenere tutte le categorie dal database
        const [categories] = await pool.query(querySelectAll);

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
    const categoryName = request.realName; // passato gia ddai controlli

    const querySelectProductByCateogryName = `
    SELECT p.*
    FROM products p
    JOIN category_product pc 
    ON p.id = pc.product_id
    JOIN categories c ON pc.category_id = c.id
    WHERE c.name = ? ;`;

    try {
    
        const [rows] = await pool.query(querySelectProductByCateogryName, [categoryName]); 
        const relativePath = rawProduct.image_url?.replace('http://localhost:3000', '') || ''; // cancello questo placeholder del dominio
        // normalizzo i prodotti
        const normalizedProducts = rows.map(product => {
            return {
                ...product,
                price: parseFloat(product.price),
                image_url: process.env.APP_URL ? `${process.env.APP_URL}${relativePath}` : relativePath
            }
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