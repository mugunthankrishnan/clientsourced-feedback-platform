// Passport is the middleware to Node and Express to handle authentication.
const passport = require('passport');
//GoogleStrategy is to handle google authentication in express.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// Importing the OAuth keys from the project created in console.google.com
const keys = require('../config/keys');

const User = mongoose.model('users')

// Why Seralizeuser? -> If a user logs in to the application, the user should be checked whether
// he/she has already signed in before and to assign a unique value to the user to indicate it's a
// returning user. Basically creating a cookie.
passport.serializeUser((user, done) => {
    console.log("Serializing ",user.id);
    done(user, user.id); // user.id is the unique ID of the record that mongo has assigned to the record.
    // Using the done function we are turning the "user" mongoose model instance/function into a user.id value.
});

// Turn the id into mongoose model instance.
// Cookie deserializing here.
passport.deserializeUser((id, done) => {
    console.log("Deserializing", id);
    console.log(User.findById(id));
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy
    (
        {
            clientID:keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL:'/auth/google/callback'
            // Purpose of callbackURL: After the user grants permission, where should the user be redirected to.
            // Since the user is redirected to the server.
        }, (accessToken, refreshToken, profile, done) => {
            //Access Token: This token is a form of permission given to the website the user has given permission
            //to, saying that the website can perform operation on the user's email on behalf of the user like
            //deleting emails, reading contact list, etc,..
            //Refresh Toekn: This token would allow the website to refresh the access token. The access token
            //expires after sometime. So the refresh token allows us to refresh the access token to get a new one
            //for the same user.
            
            // findOne returns a Javascript "promise" and not the direct data from the database.
            // ".then" is the function of promise.
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                    if (existingUser){
                        // we already have a record with the given profile ID.
                        console.log("Printing the existing user from the passport.js:");
                        done(null, existingUser);
                    }
                    else{
                        // create a new record with the profile ID since there isn't one.
                        // new User creates a new model instance. The then(user) is a new model instance
                        // that's returned from the database.
                        new User({ googleId: profile.id}).save().then(user => done(null, user));
                        // Anytime something is saved to mongo, it's an aynchronous operation.
                        //save() takes the new model instance and persists/saves to the database.

                    }
                })
        }
    )
);