
//task importo i posts da data.js
const posts = require("../data/data")

//task import conncection
const connection = require("../data/posts_db")


//* index (read)
function index(req, res) {
    //!--------------------------------------!mySQL------------------------------------//

    //* logica dell'index
    // res.json(posts);// lista di tutti i post (o un filtro) in formato json

    // fakeFunction() //?controllo per vedere il funzionamento di errorsHandler su app.js

    //task faccio coincidere filteredPosts con l'array iniziale
    // let filteredPosts = posts;

    //task  Se la richiesta contiene un filtro(req.query.tags = true/false => booleano), allora entriamo nell'IF
    // if (req.query.tags) {
    //     filteredPosts = posts.filter(post => post.tags.includes(req.query.tags));
    // }

    //task  restituisco l'array filteredPosts, filtrato o meno!
    // res.json(filteredPosts);
    //!--------------------------------------!mySQL------------------------------------//

    //*--------------------------------------mySQL------------------------------------//
    //task inizializzo la query da usare in mySQL 
    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500)
                .json({ error: 'Database connection failed' });
        }
        res.json(results);
    });
    //*--------------------------------------mySQL------------------------------------//
}

//* show (read)
function show(req, res) {
    //!--------------------------------------!mySQL------------------------------------//
    // res.send('Dettagli del post ' + req.params.id);
    // console.log(req.params.id); //* "req.params.id" ==> è un modo per accedere a parametri che vengono passati nell'URL di una richiesta in maniera dinamica!
    // res.json(posts[req.params.id]);

    // const postFound = posts.find((post) => post.id === parseInt(req.params.id))

    //task controllo
    // if (!postFound) {
    //     return res.json({
    //         error: "Not Found",
    //         message: "Post non trovato"
    //     })
    // }

    // res.json(postFound)
    //!--------------------------------------!mySQL------------------------------------//

    //*--------------------------------------mySQL------------------------------------//
    const { id } = req.params;
    const readSql = "SELECT * FROM posts WHERE id = ?"

    //task bonus
    const bonusSql = `
    SELECT T.*
    FROM tags AS T
    JOIN post_tag as PT 
    ON T.id = PT.tag_id
    WHERE PT.post_id = ?
    `

    connection.query(readSql, [id], (err, postResults) => {
        if (err) {
            return res.status(500).json({
                error: "DB error"
            })
        }
        if (results.length === 0) {
            return res.status(404).json({
                error: "Not Found",
                msg: "post non trovato"
            })
        };
        // res.json(results[0]) //* questo diventa una nuova costante nell'aggiunta del bonus
        const post = postResults[0]

        //task bonus
        connection.query(bonusSql, [id], (err, tagResults) => {
            if (err) {
                return res.status(500).json({ error: "db query failed" })
            }

            post.tags = tagResults;
            res.json(post)
        });
    })
    //*--------------------------------------mySQL------------------------------------//

};

//* store (create) (piu in uso in un ambiente database)
function store(req, res) {
    // res.send('Creazione nuovo post');

    //task un nuovo id incrementando l'ultimo
    const newId = posts[posts.length - 1].id + 1;

    //task nuovo obj post
    const newPost = {
        id: newId,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        immagine: req.body.immagine,
        tags: req.body.tags
    }

    //task push newPost a posts
    posts.push(newPost);

    //* controllo
    console.log(posts);

    //task res=>status corretto e newPost
    res.status(201);
    res.json(newPost);
};

//* update (update)
function update(req, res) {
    // res.send('Modifica integrale del post ' + req.params.id);

    //task imposto l'id dinamicamente
    const id = parseInt(req.params.id)

    //task cerco il post
    const updatePost = posts.find(post => post.id === id);

    //* res.status(404) se "updatePost == false" ==> RETURN res.json(obj)
    if (!updatePost) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    //* Aggiorno updatePost manualmente
    // updatePost.titolo = req.body.titolo;
    // updatePost.immagine = req.body.immagine;
    // updatePost.contenuto = req.body.contenuto;
    // updatePost.tags = req.body.tags;

    //task effettuo in un ciclo for...in ==> aggiorno in maniera dinamica rispetto a sopra
    //* basta un solo comando "updatePost[key] = req.body[key]" ==> trattandosi di un ciclo se 
    //* a questo comando faccio corrispondere piu chiavi con il rispettivo valore modificato, 
    //* il ciclo si occuperà di cercarle e modificarne il valore corrispondente!

    for (let key in req.body) {
        updatePost[key] = req.body[key];
        //! ATTENZIONE nel for..in [key] != ["key"] ==> parliamo di una chiave "ANONIMA" che CAMBIA a ogni ciclo!
    }

    //task controllo array
    console.log(posts)

    //task  Restituiamo il post appena aggiornato
    res.json(updatePost);

};

//* modify/patch (update)
function patch(req, res) {
    // res.send('Modifica parziale del post ' + req.params.id);

    //? si tratta dello stesso procedimento di update essenzialmente ma con MENO chiavi nel ciclo for...in

    //task imposto l'id dinamicamente
    const id = parseInt(req.params.id)

    //task cerco il post
    const patchedPost = posts.find(post => post.id === id);

    //* res.status(404) se patchedPost non esiste
    if (!patchedPost) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    //* Aggiorno patchedPost
    // patchedPost.titolo = req.body.titolo;
    // patchedPost.immagine = req.body.immagine;
    // patchedPost.contenuto = req.body.contenuto;
    // patchedPost.tags = req.body.tags;

    //task effettuo in un ciclo for...in l'aggiornamento in maniera dinamica
    //* vedi spiegazione for..in sopra!
    for (let key in req.body) {
        patchedPost[key] = req.body[key];
    }

    //task controllo array
    console.log(posts)

    //task post appena aggiornato(in json)
    res.json(patchedPost);

};

//* destroy (delete)
function destroy(req, res) {
    //!--------------------------------------!mySQL------------------------------------//
    // // res.send('Eliminazione del post ' + req.params.id);
    // const deletedPost = posts.find((post) => post.id === parseInt(req.params.id))

    // //task controllo
    // if (!deletedPost) {
    //     res.status(404)
    //     return res.json({
    //         status: 404,
    //         error: "Not Found",
    //         message: "Post non trovato"
    //     })
    // }

    // //task Rimuoviamo il post
    // posts.splice(posts.indexOf(deletedPost), 1);

    // //task ritorno un console log dell'array SENZA il post appena eliminato
    // console.log(posts)

    // //Restituiamo lo stato corretto
    // res.sendStatus(204)
    //!--------------------------------------!mySQL------------------------------------//

    //*--------------------------------------mySQL------------------------------------//
    //task destructuring
    const { id } = req.params

    //task inizializzo la query da usare in mySQL 
    const delSql = "DELETE FROM posts WHERE id = ?"

    connection.query(delSql, [id], (err) => {

        //task controllo oggetto non trovato
        res.status(404) && res.json({ error: "Obj Not Found" })

        if (err) {
            return res.status(500)
                .json({ error: 'Database connection failed' });
        }
        res.sendStatus(204)
    });
    //*--------------------------------------mySQL------------------------------------//



};

module.exports = { index, show, store, update, patch, destroy }