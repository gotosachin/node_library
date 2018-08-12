const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {
    function getIndex(req, res) {
        const url = 'mongodb://localhost/27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to db!!!');
                const db = client.db(dbName);
                const col = db.collection('books');
                const books = await col.find().toArray();
                debug("books collection " + books);
                res.render('books', {
                    title: 'All Books',
                    nav,
                    books
                });
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    }

    function getById(req, res) {
        const url = 'mongodb://localhost/27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to db!!!');
                const {id} = req.params;
                const db = client.db(dbName);
                const col = db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(id) });
                debug("book " + book);
                res.render('bookView', {
                    title: 'Single Book',
                    nav,
                    book
                });
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    };
    function middleware(req, res, next){
        if (req.user) {
            next();
        }else{
            res.redirect('/');
        }
    }
    return {
        getIndex,
        getById,
        middleware
    };
}

module.exports = bookController;