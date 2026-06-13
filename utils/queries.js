'use strict';

import { index } from "../controllers/products";

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
/* ====== CATEGORIES ===== */

export {
    querySelectAll,
    querySelectById,
    querySelectFeaturedProducts,
    querySelectProductBySearchString,
    querySelectProductStarRatingById
};