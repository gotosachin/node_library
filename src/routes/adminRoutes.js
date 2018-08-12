const express = require('express');
const { MongoClient } = require('mongodb');

const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

function router(nav) {
    const books = [
        {
            'id': 1,
            'title': 'Book1',
            'author': 'Book author1',
            'genre': 'Book Genre'
        },
        {
            'id': 2,
            'title': 'Book1',
            'author': 'Book author1',
            'genre': 'Book Genre'
        },
        {
            'id': 3,
            'title': 'Book1',
            'author': 'Book author1',
            'genre': 'Book Genre'
        }
    ];

    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost/27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to db!!!');
                    const db = client.db(dbName);
                    const result = await db.collection('books').insertMany(books); // inserting many books in books collection
                    res.json(result);
                } catch (err) {
                    debug('Connection failed!!!' + err.stack);
                    client.close();
                }
            }());
            //res.send('Inserting data');
        });

    // adminRouter.route('/:id')
    //     .get((req, res) => {
    //         const { id } = req.params;
    //         res.render('bookView', {
    //             title: 'Single Book',
    //             nav,
    //             book: books[2]
    //         });
    //     });
    return adminRouter;
}

module.exports = router;