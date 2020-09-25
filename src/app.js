const express = require('express')
const app = express()
const passport = require('passport')

const VKontakteStrategy = require('passport-vkontakte').Strategy

passport.use(new VKontakteStrategy({
        clientID:     7607305,
        clientSecret: 'rEdqfUOm5pr1M3zHok8K',
        callbackURL:  "https://oauth.vk.com/blank.html"
    },
    function(accessToken, refreshToken, params, profile, done) {
        return done(null, profile);
    }
));

const PORT = process.env.PORT || 3000

// app.get('/auth/vkontakte',
//     passport.authenticate('vkontakte'),
//     function(req, res){
//         // The request will be redirected to vk.com for authentication, so
//         // this function will not be called.
//     });

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login',
        session: false
    }),
    function(req, res) {
        res.send(req.user);
    });

app.use(function(req, res, next){
    const err = new Error('Не найдено!');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })
})

const server = app.listen(PORT, function () {
})