//! questo file js Contiene la logica per la gestione delle rotte relative ai post

//task importo express
const express = require("express");

//task creo istanza tramite la classe express.Router()
const blog = express.Router()

//task importo e destrutturo tutte le funzioni richiamandole nelle rotte!
const { index, show, store, update, patch, destroy } = require("../controllers/postController");


//task raccolgo tutte le rotte qui(REST) facendo riferimento alla variabile sopra 
//* index (read)
blog.get('/', index);

//* show (read)
blog.get('/:id', show);

//* store (create) (piu in uso in un ambiente database)
blog.post('/', store);

//* update (update)
blog.put('/:id', update);

//* modify/patch (update)
blog.patch('/:id', patch);

//* destroy (delete)
blog.delete('/:id', destroy);

module.exports = blog