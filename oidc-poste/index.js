const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const http    = require("http");
const https = require("https")
const fs = require('fs');


const { Issuer,Strategy } = require('openid-client');

const path = require("path");

const {provider, poste} = require('../dnsconstants')

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname)));

app.use(express.json({ limit: '15mb' }));
app.use(session({secret: 'secret', 
                 resave: false, 
                 saveUninitialized: true,}));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
Issuer.discover(provider.site) 
  .then(function (oidcIssuer) {
    var client = new oidcIssuer.Client({
      client_id: poste.client_id,
      client_secret: poste.client_secret,
      redirect_uris: poste.redirect_uris,
      response_types: ['code'],
      prompt : ["login"]      
    });

    passport.use(
      'oidc',
      new Strategy({ client,passReqToCallback: true}, (req, tokenSet, userinfo, done) => {
        console.log("tokenSet",tokenSet);
        console.log("userinfo",userinfo);
        req.session.tokenSet = tokenSet;
        req.session.userinfo = userinfo;
        return done(null, tokenSet.claims());
      }
      
      )
    );
  });

app.get('/login',
function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login handler');
    next();
},
passport.authenticate('oidc',{scope:"openid"}));

app.get('/login/callback',(req,res,next) =>{

  passport.authenticate('oidc',{ successRedirect: '/home',
  failureRedirect: '/' })(req, res, next)
}
  
)

app.get("/",(req,res) =>{
   res.send(" <a href='/login'>Log In with OAuth 2.0 Provider </a>")
})

app.get ("/home", (req,res) =>{
  res.sendFile(path.join(__dirname+'/MyInps-Bacheca.html'))
})


app.get ("/user",(req,res) =>{
    res.header("Content-Type",'application/json');
    res.end(JSON.stringify({tokenset:req.session.passport.user.at_hash,userinfo:req.session.passport.user},null,2));

})

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

  //const httpServer = http.createServer(app)
  const server= https.createServer(options,app).listen(poste.port, poste.dns);
  /*httpServer.listen(8080,() =>{
      console.log(`Http Server Running on port 8080`)
      console.log('http://localhost:8080')
    })*/