//task notFound accetta 3 argomenti (come un middleware classico)
//* intercetta e risponde con codice errore a chiamata con rotta inesistente

function notFound(req, res, next) {
    res.status(404)

    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};

//task esporto
module.exports = notFound;