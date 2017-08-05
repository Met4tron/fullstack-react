const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);

});

passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(error => console.log(error));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User
        .findOne({googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                console.log(`User already exists!`);
                done(null, existingUser);
            } else {
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user))
                    .catch(error => console.log(error));
            }
        })
        .catch(error => console.log(error));
}));
