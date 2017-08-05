const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();

require('./models/User');
require('./services/passport');

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI, {useMongoClient: true});
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Connected on PORT ${PORT}`));