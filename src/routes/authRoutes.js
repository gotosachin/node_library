const express = require('express');
const { MongoClient } = require('mongodb');

const passport = require('passport');
const debug = require('debug')('app:authRoutes');
const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signup')
        .post((req, res) => {
            debug(req.body);
            //res.json(req.body);
            // Create a user
            const {username, password} = req.body;

            const url = 'mongodb://localhost/27017';
            const dbName = 'libraryApp';

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const user = {username, password};
                    const result = await db.collection('users').insertOne(user); //insert user in users collection
                    debug(result);
                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });

                } catch (err) {
                    debug(err);
                    client.close();
                }
            }());
        });

    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                title: 'Login Page',
                nav
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failerRedirect: '/'
        }));

    authRouter.route('/profile')
        .all((req, res, next) =>{
            if (req.user){
                next();
            }else{
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;