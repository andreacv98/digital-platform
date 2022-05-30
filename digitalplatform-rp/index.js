const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const http    = require("http");
const https = require('https');
const fs = require('fs');


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const { Issuer,Strategy } = require('openid-client');

const path = require("path");


const app = express();

app.use(cookieParser());
app.use(express.urlencoded({
  extended: true,
}));


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

Issuer.discover('https://10.0.0.80:3000') 
  .then(function (oidcIssuer) {
    var client = new oidcIssuer.Client({
      client_id: 'digitalPlatformRP',
      client_secret: 'Some_super_secret',
      redirect_uris: ["https://10.0.0.202:8080/login/callback"],
      response_types: ['code'], 
      
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

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"]
      }
    })
  )

app.get('/login',
function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login handler');
    next();
},
passport.authenticate('oidc',{scope:"openid"}));

app.get('/login/callback',(req,res,next) =>{

  passport.authenticate('oidc',{ successRedirect: '/user',
  failureRedirect: '/' })(req, res, next)
}
  
)

app.get("/",(req,res) =>{
  res.sendFile(path.join(__dirname+'/views/index.html'));
   //res.send(" <a href='/login'>Log In with OAuth 2.0 Provider </a>")
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
  const server= https.createServer(options,app).listen(8080, "10.0.0.202");
  /*httpServer.listen(8081,() =>{
      console.log(`Http Server Running on port 8081`)
      console.log('http://localhost:8081')
    })*/