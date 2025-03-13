//task creo in data.js un file da esportare per accedere all'array senza dover riscrivere tutto solo importando data! 
//FIX per convenzione in generale i data vanno in una cartella apposita come con public! (fix on next)

const data = [
    {
        id: 1,
        titolo: "Il mio viaggio in Italia",
        contenuto: "Esplorando le meraviglie di Roma e Firenze...",
        immagine: "images/italia.jpg",
        tags: ["viaggio", "italia", "arte", "cucina"]
    },
    {
        id: 2,
        titolo: "Ricetta della pasta alla carbonara",
        contenuto: "Un classico della cucina italiana, facile e delizioso...",
        immagine: "images/carbonara.jpg",
        tags: ["cucina", "italia", "pasta", "ricetta"]
    },
    {
        id: 3,
        titolo: "I migliori libri da leggere quest'estate",
        contenuto: "Una selezione di romanzi, thriller e saggi da non perdere...",
        immagine: "images/libri.jpg",
        tags: ["libri", "lettura", "estate", "consigli"]
    },
    {
        id: 4,
        titolo: "Come fotografare il cielo notturno",
        contenuto: "Consigli e tecniche per catturare la bellezza delle stelle...",
        immagine: "images/stelle.jpg",
        tags: ["fotografia", "natura", "stelle", "notte"]
    },
    {
        id: 5,
        titolo: "La storia del caffè",
        contenuto: "Dalle origini in Etiopia alla diffusione in tutto il mondo...",
        immagine: "images/caffe.jpg",
        tags: ["caffè", "storia", "bevanda", "cultura"]
    }
];

module.exports = data