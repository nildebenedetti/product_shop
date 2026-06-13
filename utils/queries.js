'use strict';

/* ====== PRODUCTS ===== */

// INDEX

const querySelectAll = 'select * from `products`';

// SHOW
const querySelectById = 'SELECT * FROM `products` WHERE id = ?';

// FEATURED - i 5 prodotti più recenti in base a data di pubblicazione
const querySelectFeaturedProducts = `select p.*
    from products p 
    order by updated_at desc
    limit 5;`;

/* restituisce le row dei prodotti che contengono la stringa ricevuta dalla richiesta la ricerca in p.name/p.description/c.name/c.description  */

const querySelectProductBySearchString = `
    select p.*
    from products p
    join category_product cp on p.id = cp.product_id
    join categories c on c.id = cp.category_id
    where p.name like ? 
    or p.marketing_description like ? 
    or c.name like ? 
    or c.marketing_description like ?;
    `;



/* restituisce la media delle review del prodotto a partire dall'id ricevuto in request */

const querySelectProductStarRatingById = `
    select avg(r.start_rating)
    from reviews r
	join products p on p.id = r.product_id
    where p.id = ?;`;




/* ====== REVIEWS ===== */

// Query di partenza se non viene specificato alcun filtro.
const querySelectAllReviews = "SELECT * FROM reviews";

/* mostra le 3 reviews più recenti */

const querySelectFeaturedReviews = `select r.*, p.name as product_name
    from reviews r join products p on p.id = r.product_id
    where p.id = ?
    ORDER BY r.submission_date DESC
    LIMIT 3;`;

// mostra tutte le revie in base a id di un prodotto

const queryShowAllProductReviews = `select r.*, p.name as product_name, p.id as product_id
    from reviews r join products p on p.id = r.product_id
    where p.id = ?
    ORDER BY r.submission_date DESC`;

// create 

const queryCreateReview = `INSERT INTO reviews
            (title, body, start_rating, author_name, submission_date, find_it_useful, product_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

// destroy
const queryDestroyReview = `delete r.*
    from reviews r
    where r.id = ? `;


/* ====== CATEGORIES ===== */

/* INDEX - Recupera l'intero catalogo organizzato per categorie, includendo tutti i dettagli dei prodotti.
Usa il LEFT JOIN per mostrare TUTTE le categorie, comprese quelle che non hanno prodotti associati.
Ideale per generare nel frontend un menu o un catalogo strutturato in macro-sezioni. */

    const querySelectAllCategoriesandProducts = `    SELECT 
    c.id as category_id, c.name AS category_name, c.category_type as category_type, c.short_description AS category_short_description, c.marketing_description as category_marketing_description, p.id AS product_id, p.name as product_name, p.short_description as product_short_description, p.marketing_description as product_marketing_description, p.ingredients, p.allergens, p.availability, p.price , p.image_url as imageUrl
    FROM categories c
    LEFT JOIN category_product cp ON c.id = cp.category_id
    LEFT JOIN products p ON p.id = cp.product_id`;

/* SHOW -  Recupera l'elenco dei soli prodotti appartenenti a una specifica categoria tramite category ID.
Esegue una INNER JOIN escludendo le categorie vuote o i prodotti non categorizzati.
Ideale per filtrare il catalogo quando l'utente clicca su una specifica sezione (es. "/categoria/5"). */

        const querySelectProductByCateogryId = `
    SELECT p.*
    FROM products p
    JOIN category_product pc 
    ON p.id = pc.product_id
    JOIN categories c ON pc.category_id = c.id
    WHERE c.id = ? ;`;



export {
    querySelectAll,
    querySelectById,
    querySelectFeaturedProducts,
    querySelectProductBySearchString,
    querySelectProductStarRatingById,
    querySelectAllReviews,
    querySelectFeaturedReviews,
    queryShowAllProductReviews,
    queryCreateReview,
    queryDestroyReview,
    querySelectAllCategoriesandProducts,
    querySelectProductByCateogryId
};