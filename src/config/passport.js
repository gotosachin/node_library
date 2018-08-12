const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    // Store user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retriev user from the session
    passport.deserializeUser((user, done) => {
        done(null, user);
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });



}