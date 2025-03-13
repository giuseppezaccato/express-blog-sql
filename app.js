
//task importo express
const express = require("express");
const app = express();
//task importo CORS
const cors = require("cors")
const port = 3000;

//task importo direttamente il modulo corrispondente all'esportazione di posts.js=> blog
const postRouter = require("./routers/posts");

//task importo i middlewares
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

//! è necessario che il middleware CORS sia posizionato prima di definire rotte 
//!     come app.use("/posts", postRouter) e prima di middleware come express.json()

//task CORS middleware
app.use(cors({
    origin: "http://localhost:5173" //* porta "classica" di react
}))

//task accesso all'asset statico "public"
app.use(express.static('public'));

//task body-parse
app.use(express.json());


//task "monto" il router postsRouter sul percorso /posts
//* tutte le rotte definite all'interno del modulo postsRouter saranno accessibili sotto il PREFISSO "/posts"
//! RICORDA questo "middleware" va scritto sempre dopo il body-parse ma PRIMA degli ERRORI : "errorHandler" e "notFound"
app.use("/api/posts", postRouter);


// //task home landing page TEST non necessario
// app.get("/", (res, req) => {
//     res.send(`il mio blog`);
// });

//? entrambi forniscono un errore di tipo diverso in riferimento all'intercettazione fatta rispettivamente su controller o router
app.use(errorsHandler);     //* intercetta i possibili errori dell'applicazione => riferimento a "logica=>./controllers/postController.js"
app.use(notFound);          //* intercetta i possibili errori della rotta => riferimento a "rotte=>./routers/posts.js"

//!! ATTENZIONE la registrazione globale di questi due middleware va fatta in fondo alle rotte
//? registrando il middleware notFound prima delle altre rotte,intercetterà tutte le richieste, incluse quelle corrette, e restituirà sempre un 404!

//task avvio il server e lo lascio in ascolto su "port" (3000)
app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
});

