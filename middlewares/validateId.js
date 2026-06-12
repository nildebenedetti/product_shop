function validateId(request, response, next) {

    const { id } = request.params;
    const realId = Number(id.trim());

    if (isNaN(realId) || realId <= 0) {
        response.status(400).json({ error: 'Id non valido', results: null });
        return;
    }

    request.realId = realId;

    next();

}

export { validateId };