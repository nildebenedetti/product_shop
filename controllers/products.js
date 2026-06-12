// import connection from database
import pool from '../utils/db.js';

async function index(request, response) {
    const querySelectAll = 'select * from `products`';

    try {
        const [rows] = await pool.query(querySelectAll);


        response.json({
            error: null,
            results: rows
        });
    } catch (error) {
        console.error("errore durante l'import del catalogo prodotti", error.message)
        response.status(500).json({
            error: 'errore interno del server nel recupero del catalogo prodotti',
            results: null
        })
    }
}

async function show(request, response) {
    const realId = request.realId;
    const querySelectById = 'SELECT * FROM `products` WHERE id = ?';

    // recupero prodotto grezzo
    const rawProduct = rows[0];
    const relativePath = rawProduct.image_url?.replace('http://localhost:3000', '') || ''; // cancello questo placeholder del dominio
    // creo oggetto con prodotto normalizzato
    const normalizedProduct = {
        ...rawProduct,
        price: parseFloat(rawProduct.price),
        image_url: process.env.APP_URL ? `${process.env.APP_URL}${relativePath}` : relativePath
    }
    try {
        const [rows] = await pool.query(
            querySelectById, [realId]
        );
        response.status(200).json({ error: null, results: normalizedProduct });
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