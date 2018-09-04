var FacebookStrategy = require('passport-facebook').Strategy; // Import Passport-Facebook Package
var User = require('../models/user'); // Import User Model
var session = require('express-session'); // Import Express Session Package
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret to use with JWT

module.exports = function(app, passport) {
    // Start Passport Configuration Settings
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
    // End Passport Configuration Settings

    // Serialize users once logged in
    passport.serializeUser(function(user, done) {
      token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
        done(null, user.id); // Return user object
    });

    // Deserialize Users once logged out
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user); // Complete deserializeUser and return done
        });
    });
passport.use(new FacebookStrategy({
      clientID: '571700383162602',
      clientSecret: '8e97a8783733268615df1d546f73c575',
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile._json.email }).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });
            done(null,profile);
        }
    ));

  // Facebook Routes
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
        res.redirect('/facebook/' + token); // Redirect user with newly assigned token
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
 return passport; // Return Passport Object
};
