function validateProducts(request, response, next) {

    const { id, name, short_description: shortDescription, marketing_description: mktgDescription, price } = request.params;

    const realId = Number(id.trim());
    const realName = name.trim(); 
    const realShortDescription = shortDescription.trim();
    const realMktgDescription = mktgDescription.trim();
    const realPrice = Number(price.trim());

    if (isNan(realId)) {
        response.status(400)
            .json({
            error: 'Id non corretto: inserire un id valido!'
        });
        return;
    } else  if (isNaN(realId) || realId <= 0) {
        res.status(400).json({ error: 'Id non valido', results: null });
        return;
    }

    if (realName === '') {
        response.status(400)
            .json({
            error: 'il campo nome è obbligatorio'
        });
        return;
    } else if (realName.length < 3 || realName.length > 150) {
        response.status(400)
            .json({
            error: 'il nome del prodotto deve avere una lunghezza compresa tra i 3 e i 150 caratteri (spazi inclusi)'
        })
        return;
    }

    if (realShortDescription = '') {
        response.status(400)
            .json({
            error: 'il campo short_description è obbligatorio'
        });
        return;
    } else if (realShortDescription.length < 30 || realShortDescription.length > 255) {
        response.status(400)
            .json({
            error: 'il campo short_description deve avere una lunghezza compresa tra i 30 e i 255 caratteri (spazi inclusi)'
        });
        return;
    }

    if (realMktgDescription === '') {
        response.status(400)
            .json({
                error: 'il campo marketing_description è obbligatorio'
            });
            return;
    } else if (realMktgDescription.length < 255 || realMktgDescription.length > 900 ) {
        response.status(400)
            .json({
                error: 'il campo marketing_description deve avere una lunghezza compresa tra i 255 e i 900 caratteri (spazi inclusi)'
            });
            return;
    }

    // price (decimal, parsefloat to 2, compreso tra 3 e 15)
    if (isNan(realPrice)) {
        response.status(400)
            .json({
                error: 'Il campo price deve essere un numero!'
            });
            return;
    } else if (realPrice <= 0) {
        response.status(400)
            .json({
                error: 'ti piacerebbe pagare i clienti per mangiare gelati? A me no... inserisci un numero positivo'
            });
            return;
    } else if (realPrice < 3 || realPrice> 15 ) {
        response.status(400)
            .json({
                error:'Il prezzo inserito è contro ogni logica: inserire un valora tra 3 e 15'
            });
            return;
    }

    
    
    // ingredients 
    // allergens
    // image url ASPETTA ALDO CON IMG = SYNCH DB

    // create e update time stamp non penso ci sia da fare validazione ??? discuss lcon Lorenzo


    request.realId = realId;
    request.realName = realName;
    request.realShortDescription = realShortDescription;
    request.realMktgDescription = realMktgDescription;

    next();

}

export default validateProducts;