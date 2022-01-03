const express = require('express');
const app = express();
const passport = require("./configs/passport")
app.use(express.json());
app.use(passport.initialize());
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cookieParser());
app.use(cors({origin:'https://students-mng-rohanpatel.vercel.app'}))
passport.serializeUser(function({user, token}, done) {
    done(null, {user, token});
});
  
passport.deserializeUser(function({user, token}, done) {
    done(err, {user, token});
});

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    const {user, token} = req.user
    let name="rohanEmail"+user.email
    return res.redirect('https://students-mng-rohanpatel.vercel.app/' + "?"+ token+name);
    // return res.redirect('https://www.google.com');

    token=""
    name=""
    // return res.status(200).json({user, token });
});

const studentController=require("./controllers/admin.controller")

app.use("/admin",studentController)

module.exports = app;