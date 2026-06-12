function validateCategoryBody(request, response, next) {
    const { name, marketing_description: mktgDescription, short_description: shortDescription, category_type: categoryType } = request.body;
    const realName = name.trim();
    const realMktgDescription = mktgDescription.trim();
    const realShortDescription = shortDescription.trim();
    const realCategoryType = categoryType.trim();

    if (realName === '') {
        response.status(400)
            .json({
                error: 'il campo name è obbligatorio'
            });
        return;
    } else if (realName.length < 3 || realName.length > 100) {
        response.status(400)
            .json({
                error: 'il name della category deve avere una lunghezza compresa tra i 3 e i 100 caratteri (spazi inclusi)'
            })
        return;
    }

    if (realShortDescription === '') {
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
    } else if (realMktgDescription.length < 255 || realMktgDescription.length > 400) {
        response.status(400)
            .json({
                error: 'il campo marketing_description deve avere una lunghezza compresa tra i 255 e i 400 caratteri (spazi inclusi)'
            });
        return;
    }

    if (realCategoryType === '') {
        response.status(400)
            .json({
                error: 'il campo category_type è obbligatorio'
            });
        return;
    } else if (realCategoryType !== 'theme' || realCategoryType !== 'product_type') {
        // entra nel controllo
        // il controllo lancerá lérrore se
        // é diverso da theme
        // se invece è uguale prosegue la lettura della stringa e lancia errore se
        //è diverso da product_type
        response.status(400)
            .json({
                error: 'inserisci uno dei seguenti valori: theme, product_category'
            });
        return;
    }

    request.realName = realName;
    request.realMktgDescription = realMktgDescription;
    request.realShortDescription = realShortDescription;
    request.realCategoryType = realCategoryType;


};

export {
    validateCategoryBody
};