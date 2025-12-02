const express = require('express')
const Book = require('./Book')
const app = express()
const port = 3000

const bookRouter = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', bookRouter)

let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
]



// bookRouter.route('/books')
//     //Step 1 - GET request
//     .get((req, res) => {
//         let filteredBooks = [];
//         if (req.query.genre) {
//             filteredBooks = books.filter(x => x.genre === req.query.genre)
//         }
//         else {
//             filteredBooks = books;
//         }
//         res.json(filteredBooks);
//     })



// ex 1 implementează un nou request de tip GET 
// pentru a returna lista tuturor cărților în ordine alfabetică

bookRouter.route('/books')
    .get((req, res) => {
        let result = [...books]

        if (req.query.genre) {
            result = result.filter(x => x.genre === req.query.genre)
        }

        if (req.query.sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name))
        }

        res.json(result)
    })

    //  .post((req, res) => {
    //      let newBook = new Book(req.body.id, req.body.name, req.body.genre, req.body.author);
    //      books.push(newBook);
    //      console.log(books);
    //      return res.json(newBook);
    // })


    // ex 2 Implementează apoi un request POST care să 
    // valideze informațiile trimise în corpul cererii înainte de a salva.
    .post((req, res) => {
        if (!req.body.id || !req.body.name || !req.body.genre || !req.body.author) {
            return res.status(400).json({ error: 'Toate campurile (id, name, genre, author) sunt obligatorii' })
        }

        if (books.find(b => b.id === req.body.id)) {
            return res.status(409).json({ error: 'O carte cu acest ID exista deja' })
        }

        let newBook = new Book(req.body.id, req.body.name, req.body.genre, req.body.author)
        books.push(newBook)
        
        res.status(201).json(newBook)
    })


    bookRouter.route('/books/:bookId')
    .put((req, res) => {
        let bookModif = books.find(e => e.id === Number(req.params.bookId))

        if (!bookModif) {
            return res.status(404).json({ error: "Cartea nu a fost gasita" })
        }

        if (req.body.genre) {
            bookModif.genre = req.body.genre
        }

        return res.json(bookModif)
    })

    // ex 3 Implementează ulterior o metoda de tip DELETE 
    // pentru lista de cărți și testează folosind Postman.

    .delete((req, res) => {
        let index = books.findIndex(e => e.id === Number(req.params.bookId))

        if (index === -1) {
            return res.status(404).json({ error: "Cartea nu a fost gasita" })
        }

        books.splice(index, 1)
        
        res.status(204).send()
    })

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log('Running on the port ' + port)
})