// Dependencies
const express = require('express');

// Configure & Run the http server
const app = express();

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ));

app.listen(80, () => {
  console.log('HTTP server running on port 80');
});