
//task questo middleware ha bisogno di ERR aggiuntivo rispetto a notFound proprio perche err.message è riconosciuto come errore
//task  è un metodo applicato ad err INTERNO ad express

function errorsHandler(err, req, res, next) {

    res.status(500) //*errore lato server

    res.json({
        error: err.message, //? singola chiave il cui valore è l'estrapolazione del messaggio di errore (err.message)
    });

};

//task esporto
module.exports = errorsHandler;