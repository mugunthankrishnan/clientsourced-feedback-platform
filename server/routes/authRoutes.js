const passport = require('passport');

/*  The app.get is the express app get to indicate that when a user navigates to /auth/google to make
    Passport.js code to kick in and do the OAuth workflow. Passport.authenticate authenticates google.
    When a new GoogleStrategy object is created, Passport inherently has a mechanism to say that if the
    GoogleStrategy object is created to authenticate that it's 'google'. This is the first argument.
    The second argument indicates the scope of access that we are asking google to provide from the user
    details. In this case, asking only for the user profile and the user email.
    After the user gives permission, oauth gives a 'code' back via the URL and this code is again used
    by passport to go to the user profile and not back to the OAuth flow.
*/
module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile','email']
    }));

    /*  This route handler is for after the user provides the authentication to use the google account.
        After user provides permission where should the user be redirected to. This route is already given
        in the passport.use() as the callbackURL. Now, the code that's received from the OAuth is not passed
        here explicitly. But passport understands that the user is not trying to go to the OAuth flow and
        implicitly redirects the user to the profile rather than to the Oauth flow.
    */
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        console.log("Current User from the api/current_user");
        console.log(req.user);
        res.send(req.user);
        //res.send({hi:"there"});
    });
};