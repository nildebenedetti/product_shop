'use strict';

/* ====== REVIEWS ===== */

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


    export {
    querySelectProductBySearchString,
    querySelectProductStarRatingById
};