require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {v4: uuidV4} = require('uuid');

const Admin = require("../models/admin.model");

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://ssmgmntsystm.herokuapp.com/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const email = profile?._json?.email

    let user;
    try { 
      user = await Admin.findOne({email}).lean().exec();

      if(!user) {
        user = await Admin.create({
          email: email,
          password: uuidV4()
        })
      }

      const token = jwt.sign({user}, process.env.JWT_SECRET_KEY);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport